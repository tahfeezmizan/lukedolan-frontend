"use client";
import { useEffect, useState } from "react";

interface CountUpProps {
    end: number;
    duration?: number;
}

export default function CountUp({ end, duration = 1000 }: CountUpProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start: number | null = null;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const progressRatio = Math.min(progress / duration, 1);
            setCount(Math.floor(progressRatio * end));
            if (progress < duration) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [end, duration]);

    return <>{count.toLocaleString()}</>;
}
