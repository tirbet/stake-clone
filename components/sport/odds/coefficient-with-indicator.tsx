"use client";
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon, LockIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

type Props = {
    currentValue: number;
    isSuspended: boolean;
    outcomeKey: string;
};

const CoefficientWithIndicator: React.FC<Props> = ({ currentValue, isSuspended, outcomeKey }) => {
    const [previousValue, setPreviousValue] = useState<number | undefined>(undefined);
    const [changeDirection, setChangeDirection] = useState<'up' | 'down' | null>(null);

    useEffect(() => {
        if (previousValue !== undefined && currentValue !== previousValue) {
            const direction = currentValue > previousValue ? 'up' : 'down';
            setChangeDirection(direction);

            // Reset indicator after delay
            const timer = setTimeout(() => {
                setChangeDirection(null);
            }, 2000);

            return () => clearTimeout(timer);
        }

        // Always update the previous value AFTER comparison
        setPreviousValue(currentValue);
    }, [currentValue, previousValue]);

    if (isSuspended) {
        return (
            <div className="flex items-center justify-center">
                <LockIcon className="h-4 w-4 text-gray-400" />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-end min-w-[3.5rem]">
            <div className="relative flex items-center">
                {/* Arrow indicators with smooth entrance/exit animations */}
                <div className="absolute -left-5 top-1/2 transform -translate-y-1/2">
                    {changeDirection === 'up' && (
                        <div className="animate-bounce-in">
                            <ArrowUpIcon className="h-4 w-4 text-green-400" />
                            <div className="absolute inset-0 -z-10 bg-green-400 rounded-full animate-ping opacity-30"></div>
                        </div>
                    )}
                    {changeDirection === 'down' && (
                        <div className="animate-bounce-in">
                            <ArrowDownIcon className="h-4 w-4 text-red-400" />
                            <div className="absolute inset-0 -z-10 bg-red-400 rounded-full animate-ping opacity-30"></div>
                        </div>
                    )}
                </div>

                {/* Coefficient value with enhanced visual feedback */}
                <span className={cn("font-bold transition-all duration-300")}>
                    {currentValue.toFixed(2)}
                </span>
            </div>
        </div>
    );
};

export default CoefficientWithIndicator;