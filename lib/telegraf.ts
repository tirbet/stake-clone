import * as https from "https";
import { Telegraf, Markup, Context, session } from "telegraf";
import { InlineKeyboardButton } from "telegraf/types";
import { TELEGRAF_TOKEN } from "./config";


// ---- Types ----
interface Agent {
    id: number;
    telegram_id: number;
    username: string;
    balance: number;
    role: "super" | "sub";
    superAgentTelegramId?: number;
}

interface Transaction {
    id: number;
    agent_id: number;
    player_id: string; // 1xBet ID
    type: "deposit" | "withdraw";
    amount: number;
    status: "pending" | "completed" | "rejected";
    timestamp: Date;
}

interface Topup {
    id: number;
    super_agent_id: number;
    sub_agent_id: number;
    amount: number;
    timestamp: Date;
}

interface SessionData {
    state?: string;
    playerId?: string;
    subAgentId?: number;
}

// ---- Bot Setup ----
export const bot = new Telegraf<Context & { session: SessionData }>(TELEGRAF_TOKEN, {

    telegram: {
        agent: new https.Agent({
            keepAlive: true,
            timeout: 10000, // 10 second timeout
            maxSockets: 50
        })
    }
});
bot.use(session());

// ---- In-memory storage ----
const agents: Agent[] = [
    { id: 1, telegram_id: 8459931107, username: "superagent", balance: 1000, role: "super" },
    { id: 2, telegram_id: 5162566301, username: "subagent1", superAgentTelegramId: 8459931107, balance: 500, role: "sub" },
];
const transactions: Transaction[] = [];
const topups: Topup[] = [];

// ---- Typed menus ----
type BotMenu = InlineKeyboardButton.CallbackButton[];

const subAgentMenu: BotMenu[] = [
    [
        { text: "💰 Deposit to Player", callback_data: "deposit" },
        { text: "🏧 Withdraw from Player", callback_data: "withdraw" },
    ],
    [
        { text: "🔎 Check Transaction", callback_data: "status" },
        { text: "💸 My Balance", callback_data: "balance" },
    ],
];

const superAgentMenu: BotMenu[] = [
    [{ text: "👨‍💼 Manage Sub-Agents", callback_data: "manage_agents" }],
    [{ text: "✅ Approve Withdrawals", callback_data: "approve_withdraw" }],
    [{ text: "🔎 View All Transactions", callback_data: "all_transactions" }],
    [{ text: "💸 Top-Up Sub-Agent", callback_data: "topup_subagent" }],
];

// ---- Helpers ----
const getAgent = (telegram_id: number) => agents.find(a => a.telegram_id === telegram_id);
const getSubAgentById = (id: number) => agents.find(a => a.id === id && a.role === "sub");

// ---- Start Command ----
bot.start(async (ctx) => {
    const agent = getAgent(ctx.from!.id);
    if (!agent) return ctx.reply("❌ You are not registered as an agent.");

    if (agent.role === "super") {
        await ctx.reply("👋 Welcome Super Agent!", Markup.inlineKeyboard(superAgentMenu));
    } else {
        await ctx.reply("👋 Welcome Sub-Agent!", Markup.inlineKeyboard(subAgentMenu));
    }
});

// ---- Sub-Agent Deposit ----
bot.action("deposit", async (ctx) => {
    const agent = getAgent(ctx.from!.id);
    if (!agent || agent.role !== "sub") return;

    if (!ctx.session) ctx.session = {};
    ctx.session.state = "deposit_player_id";
    await ctx.reply("💰 Enter Player 1xBet ID:");
});

// FIXED: Use 'text' event instead of filters.text()
bot.on('text', async (ctx) => {

    if (!ctx.session) ctx.session = {};

    const agent = getAgent(ctx.from!.id);
    if (!agent) return;

    const messageText = ctx.message.text;

    // ---- Deposit Flow ----
    if (ctx.session.state === "deposit_player_id") {
        ctx.session.playerId = messageText;
        ctx.session.state = "deposit_amount";
        return ctx.reply("Enter amount to deposit:");
    }

    if (ctx.session.state === "deposit_amount") {
        const amount = parseFloat(messageText);
        if (isNaN(amount) || amount <= 0) return ctx.reply("❌ Invalid amount");

        if (!ctx.session.playerId) return ctx.reply("❌ Player ID missing");

        if (agent.balance < amount) return ctx.reply("❌ Insufficient balance");

        agent.balance -= amount;
        const txId = transactions.length + 1;
        transactions.push({
            id: txId,
            agent_id: agent.id,
            player_id: ctx.session.playerId,
            type: "deposit",
            amount,
            status: "pending",
            timestamp: new Date(),
        });
        const playerId = ctx.session.playerId;
        ctx.session.state = undefined;
        ctx.session.playerId = undefined;
        if (agent.superAgentTelegramId) {
            await bot.telegram.sendMessage(
                agent.superAgentTelegramId,
                `💰 Deposit Request Received\n\n` +
                `👤 User: ${agent.username}\n` +
                `🆔 Player ID: \`${playerId}\`\n` +
                `💵 Amount: ${amount}\n` +
                `\nPlease review and take action:`,
                {
                    parse_mode: 'MarkdownV2',

                    reply_markup: Markup.inlineKeyboard([
                        Markup.button.callback('✅ Confirm', `confirm_deposit_${txId}`),
                        Markup.button.callback('❌ Reject', `reject_deposit_${txId}`)
                    ]).reply_markup
                }
            );
        }

        return ctx.reply(
            `✅ *Deposit Request Successful!*\n\n` +
            `💵 *Amount:* ${amount}\n` +
            `🆔 *Player ID:* \`${playerId}\`\n` +
            `💸 *Your balance:* ${agent.balance}\n`,
            { parse_mode: 'Markdown' }
        );

    }

    // ---- Withdraw Flow ----
    if (ctx.session.state === "withdraw_player_id") {
        ctx.session.playerId = messageText;
        ctx.session.state = "approval_code";
        return ctx.reply("Enter approval code:");
    }

    if (ctx.session.state === "approval_code") {

        if (!ctx.session.playerId) return ctx.reply("❌ Player ID missing");
        const amount = 0;
        const txId = transactions.length + 1;
        transactions.push({
            id: txId,
            agent_id: agent.id,
            player_id: ctx.session.playerId,
            type: "withdraw",
            amount,
            status: "pending",
            timestamp: new Date(),
        });

        const playerId = ctx.session.playerId;
        ctx.session.state = undefined;
        ctx.session.playerId = undefined;

        if (agent.superAgentTelegramId) {
            await bot.telegram.sendMessage(
                agent.superAgentTelegramId,
                `💰 Withdrawal Request Received\n\n` +
                `👤 User: ${agent.username}\n` +
                `🆔 Player ID: \`${playerId}\`\n` +
                `🆔 Code: \`${ctx.session.state}\`\n` +
                `\nPlease review and take action:`,
                {
                    parse_mode: 'MarkdownV2',

                    reply_markup: Markup.inlineKeyboard([
                        Markup.button.callback('✅ Confirm', `confirm_withdraw_${txId}`),
                        Markup.button.callback('❌ Reject', `reject_withdraw_${txId}`)
                    ]).reply_markup
                }
            );
        }

        return ctx.reply("✅ Withdrawal request sent to Super Agent for approval");
    }

    // ---- Top-Up Flow (Super Agent) ----
    if (ctx.session.state === "topup_subagent_id") {
        const subAgentId = parseInt(messageText);
        const subAgent = getSubAgentById(subAgentId);
        if (!subAgent) return ctx.reply("❌ Sub-agent not found");

        ctx.session.subAgentId = subAgent.id;
        ctx.session.state = "topup_amount";
        return ctx.reply(`Enter amount to top-up for ${subAgent.username}:`);
    }

    if (ctx.session.state === "topup_amount") {
        const amount = parseFloat(messageText);
        if (isNaN(amount) || amount <= 0) return ctx.reply("❌ Invalid amount");

        const superAgent = getAgent(ctx.from!.id);
        if (!superAgent || superAgent.role !== "super") return ctx.reply("❌ Only super-agent can top-up");

        const subAgent = getSubAgentById(ctx.session.subAgentId!);
        if (!subAgent) return ctx.reply("❌ Sub-agent not found");

        subAgent.balance += amount;
        topups.push({
            id: topups.length + 1,
            super_agent_id: superAgent.id,
            sub_agent_id: subAgent.id,
            amount,
            timestamp: new Date(),
        });

        ctx.session.state = undefined;
        ctx.session.subAgentId = undefined;


        return ctx.reply(`✅ Successfully topped up ${amount} to ${subAgent.username}`);
    }
});

// ---- Sub-Agent Withdraw ----
bot.action("withdraw", async (ctx) => {
    if (!ctx.session) ctx.session = {};
    const agent = getAgent(ctx.from!.id);
    if (!agent || agent.role !== "sub") return;

    ctx.session.state = "withdraw_player_id";
    await ctx.reply("🏧 Enter Player 1xBet ID for withdrawal:");
});

// ---- Super-Agent Approve Withdrawals ----
bot.action("approve_withdraw", async (ctx) => {
    const agent = getAgent(ctx.from!.id);
    if (!agent || agent.role !== "super") return;

    const pending = transactions.filter(t => t.type === "withdraw" && t.status === "pending");
    if (!pending.length) return ctx.reply("✅ No pending withdrawals");

    for (const tx of pending) {
        const subAgent = getSubAgentById(tx.agent_id);
        if (!subAgent) continue;

        subAgent.balance += tx.amount;
        tx.status = "completed";

        await ctx.reply(`✅ Approved ${tx.amount} withdrawal for Sub-Agent ${subAgent.username}, Player ID ${tx.player_id}`);
    }
});

// ---- Super-Agent Top-Up ----
bot.action("topup_subagent", async (ctx) => {
    const agent = getAgent(ctx.from!.id);
    if (!agent || agent.role !== "super") return;

    ctx.session.state = "topup_subagent_id";
    await ctx.reply("Enter Telegram ID of the Sub-Agent you want to top-up:");
});

// ---- My Balance (Sub-Agent) ----
bot.action("balance", async (ctx) => {
    const agent = getAgent(ctx.from!.id);
    if (!agent) return;
    await ctx.reply(`💸 Your balance: ${agent.balance}`);
});

// ---- Check Transaction Status ----
bot.action("status", async (ctx) => {
    const agent = getAgent(ctx.from!.id);
    if (!agent) return;

    const agentTransactions = transactions.filter(t => t.agent_id === agent.id);
    if (!agentTransactions.length) return ctx.reply("📝 No transactions found");

    let message = "📋 Your Transactions:\n\n";
    agentTransactions.forEach(tx => {
        message += `ID: ${tx.id} | ${tx.type.toUpperCase()} | ${tx.amount} | ${tx.status} | ${tx.player_id}\n`;
    });

    await ctx.reply(message);
});

// ---- View All Transactions (Super Agent) ----
bot.action("all_transactions", async (ctx) => {
    const agent = getAgent(ctx.from!.id);
    if (!agent || agent.role !== "super") return;

    if (!transactions.length) return ctx.reply("📝 No transactions found");

    let message = "📋 All Transactions:\n\n";
    transactions.forEach(tx => {
        const subAgent = getSubAgentById(tx.agent_id);
        message += `ID: ${tx.id} | Agent: ${subAgent?.username || 'Unknown'} | ${tx.type.toUpperCase()} | ${tx.amount} | ${tx.status} | ${tx.player_id}\n`;
    });

    await ctx.reply(message);
});

// ---- Error Handling ----
bot.catch((err, ctx) => {
    console.error(`Error for ${ctx.updateType}:`, err);
    ctx.reply("❌ An error occurred. Please try again.");
});

// // ---- Launch Bot ----
bot.launch().then(() => {
  console.log("Bot started successfully");
});

// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));