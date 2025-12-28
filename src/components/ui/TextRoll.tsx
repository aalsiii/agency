"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TextRollProps {
    children: string;
    className?: string;
}

export default function TextRoll({ children, className }: TextRollProps) {
    return (
        <div className={cn("group/text relative overflow-hidden flex flex-col h-[1.2em]", className)}>
            <motion.div
                className="flex flex-col"
                initial={{ y: 0 }}
                whileHover={{ y: "-50%" }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }} // smooth cubic-bezier
            >
                <span className="block leading-[1.2em]">{children}</span>
                <span className="block leading-[1.2em] text-primary select-none">{children}</span>
            </motion.div>
        </div>
    );
}
