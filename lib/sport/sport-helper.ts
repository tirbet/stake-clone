import type { SportEventItem, Team } from "@/types/sport-type";

export const groupEventsByCountryAndLeague = (events: SportEventItem[]) => {
    return events.reduce<Record<string, Record<string, typeof events[number][]>>>((acc, event) => {
        const { country, league } = event;

        if (!acc[country]) {
            acc[country] = {};
        }

        if (!acc[country][league]) {
            acc[country][league] = [];
        }

        acc[country][league].push(event);
        return acc;
    }, {});
};

export const getDisplayName = (type: 'live' | 'upcoming'): string => {
    return type === 'live' ? 'Live' : 'Upcoming';
};

export const getTeamsDisplayName = (team?: Team): string => {
    return `${team?.home.name} vs ${team?.away.name}`;
}

export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}