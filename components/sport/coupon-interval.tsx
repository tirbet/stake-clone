"use client"
import { useCreateCoupon } from "@/features/sport/api/use-create-copon";

export default function CouponInterval() {
    const { data } = useCreateCoupon();
    return null
}