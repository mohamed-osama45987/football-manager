import { AppRoutes } from "@/constants";
import axios from "./axios";

export const getTeamData = async (page = 1, limit = 10) => {
    const res = await axios.get(`${AppRoutes.TEAM}?page=${page}&limit=${limit}`);
    return res.data;
};


export interface IMarketFilters {
    userName?: string;
    playerName?: string;
    teamName?: string;
    maxPrice?: string;
}
export const getMarketPlayers = async (
    filters: { playerName?: string; teamName?: string; maxPrice?: string },
    page: number = 1,
    limit: number = 6
) => {
    const query = new URLSearchParams({
        ...filters,
        page: page.toString(),
        limit: limit.toString(),
    }).toString();

    const res = await axios.get(`${AppRoutes.TRANSFER}?${query}`);
    return res.data;
};

