export const API_URL = process.env.API_SPORT || "https://api.tirbet.online"
export const API_KEY = process.env.API_KEY || "text-api-key";
export const sportIds = (): number[] => {
    return [1, 2, 3, 4, 5, 6, 8, 13, 16, 29, 66, 97, 287];
}