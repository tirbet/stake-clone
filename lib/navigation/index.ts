import { adminNavigations } from "@/lib/navigation/admin";
import { User } from "@/types/auth";
import prisma from "../prisma";
import { KycField } from "../constants/configuration";
type KycLevelConfig = {
    label: number;
    isActive: boolean;
};
export const config = async (user: User | undefined) => {
    const getKyc = async () => {
        if (!user) return [];
        const configurations = await prisma.configuration.findMany({
            where: { type: 'kyc' },
        })
        const formattedConfigurations = configurations.map((config) => {
            const value = config.value as KycLevelConfig;

            return value;
        });
        return formattedConfigurations;
    }


    const data = {
        navigation: {
            admin: adminNavigations(user)
        },
        kyc: await getKyc()

    }

    return data;
}