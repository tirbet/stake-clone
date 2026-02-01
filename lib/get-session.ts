// lib/get-session.ts
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { cache } from "react";

export const getSession = cache(async () => {
    console.log('get session')
    const res = await auth.api.getSession({
        headers: await headers(),
    });
    return {
        ...res
    }
});
