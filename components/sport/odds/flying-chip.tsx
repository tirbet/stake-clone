"use client";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type FlyingChipProps = {
    cursor: { x: number; y: number };
    label: string;
    coefficient: number;
    onComplete: () => void;
}

const FlyingChip = ({ cursor, label, coefficient, onComplete }: Readonly<FlyingChipProps>) => {

    const isMobile = useIsMobile();

    return (
        <motion.div
            // Initial position - exactly where user clicked
            initial={{
                position: "fixed",
                left: cursor.x,
                top: cursor.y,
                x: "-50%", // Center the element on the cursor
                y: "-50%",
                scale: 1,
                opacity: 1,
                rotate: 0,
            }}
            // Animate to bottom-right corner
            animate={{
                left: "calc(100vw - 80px)", // Bottom-right with some offset
                top: "calc(100vh - 80px)",
                scale: 0.8,
                opacity: 0,
                rotate: 15, // Slight rotation for visual effect
            }}
            transition={{
                duration: 0.7,
                ease: [0.4, 0, 0.2, 1], // Smooth easing
            }}
            onAnimationComplete={onComplete}
            className="z-50 pointer-events-none flex items-center gap-2 bg-blue-500 text-white text-xs px-3 py-2 rounded-md shadow-lg border border-blue-300"
            style={{
                // Ensure it's positioned relative to viewport
                transform: "translate(-50%, -50%)",
            }}
        >
            <span className="font-medium truncate max-w-[100px]">{label}</span>
            <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded">
                {coefficient}
            </span>
        </motion.div>
    );
};

export default FlyingChip