import React from "react";

type ProbabilityItem = {
    label: string;
    value: number; // From 0.0 to 1.0
    color: string; // e.g., "bg-green-500"
    tooltip?: string;
};

type ProbabilityBarProps = {
    title?: string;
    items: ProbabilityItem[];
};

const ProbabilityBar: React.FC<ProbabilityBarProps> = ({ title = "Probability of winning", items }) => {

    const mathRound = (val: number) => Math.round(val * 100);

    return (
        <div className="w-full max-w-2xl mx-auto px-1">
            <div className="text-center text-sm text-gray-300 mb-0.5">{title}</div>

            {/* Bar */}
            <div className="flex w-full h-1.5 rounded-full overflow-hidden">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={item.color}
                        style={{ width: `${mathRound(item.value)}%` }}
                        title={item.tooltip || `${item.label} (${mathRound(item.value)}%)`}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-between text-xs text-gray-400 mt-1 px-1 gap-y-1 gap-x-1">
                {items.map((item, index) => (
                    <span
                        key={index}
                        className="flex items-center max-w-full wrap-break-word"
                    >
                        <span className={`w-2 h-2 rounded-full mr-1 shrink-0 ${item.color}`}></span>
                        <span className="max-w-30 truncate sm:max-w-full">({mathRound(item.value)}%) {item.label.split(" ")[0]} </span>
                    </span>
                ))}
            </div>

        </div>
    );
};

export default ProbabilityBar;