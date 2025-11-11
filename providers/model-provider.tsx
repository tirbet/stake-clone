'use client';

import { useMountedState } from "react-use";

export const ModelProvider = () => {
    const isMounted = useMountedState();

    if(!isMounted) return null;
}