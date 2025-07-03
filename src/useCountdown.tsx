import {useEffect, useState} from "react";

export function useCountdown(dbDate?: string) {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (!dbDate) return;
        const startDate = new Date(dbDate);
        const endDate = new Date(startDate.getTime() + 10 * 60 * 1000); // +10 minutes

        const updateCountdown = () => {
            const now = new Date();
            const diff = Math.max(0, Math.floor((Number(endDate) - Number(now)) / 1000)); // in seconds
            setTimeLeft(diff);
        };

        updateCountdown(); // initialize

        const interval = setInterval(() => {
            updateCountdown();
        }, 1000);

        return () => clearInterval(interval);
    }, [dbDate]);

    const formatted = formatTime(timeLeft);

    return {
        timeLeft,
        formatted,
        isExpired: timeLeft === 0,
    };
}

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
}
