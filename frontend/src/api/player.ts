
import axios from "./axios";

export const sellPlayer = (id: string, askingPrice: number) =>
    axios.post(`/transfer/sell/${id}`, {
        askingPrice
    });

export const unsellPlayer = (id: string) =>
    axios.post(`/transfer/unsell/${id}`);

export const buyPlayer = (id: string) =>
    axios.post(`/transfer/buy/${id}`);
