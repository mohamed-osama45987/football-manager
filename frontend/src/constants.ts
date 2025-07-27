
export const AppRoutes = {
    LOGIN: '/login',
    auth: '/auth',
    DASHBOARD: '/',
    TRANSFER: '/transfer',
    TEAM: '/team',
}


export interface IPlayer {
    _id: string;
    name: string;
    position: string;
    price: number;
    forSale: boolean;
    teamId: any;
}