import type { auth } from "@/lib/auth";

export interface HonoEnv {
    Variables: {
        user: typeof auth.$Infer.Session.user;
        session: typeof auth.$Infer.Session.session;
    }
}