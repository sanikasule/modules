import { create } from "zustand";
import { ordersList } from "../api/orders.api";
import type { OrdersListResponse, OrdersListItem } from "../types/orders.types";

interface OrdersState {
    list: OrdersListItem[];
    totalOrderCount: number;
    ordersList: (data: { filterOn: []; sortOn: [] }) => Promise<void>;
}

const exchanges = ["NSE", "BSE", "MCX"];

export const useOrdersStore = create<OrdersState>((set) => ({
    list: [],
    totalOrderCount: 0,
    ordersList: async (data) => {
        try {
            const response: OrdersListResponse = await ordersList(data);
            const ordersData = response.orders || [];

            const duplicatedOrdersData = Array.from({ length: 100 }).flatMap(
                (_, loopIndex) =>
                    ordersData.map((order: OrdersListItem) => {
                        const randomIndex = Math.floor(Math.random() * exchanges.length);

                        return {
                            ...order,
                            exchange: exchanges[randomIndex],
                            key: `${order.nestOrderNumber}-${loopIndex}`,
                        };
                    }),
            );
            set({
                list: duplicatedOrdersData,
                totalOrderCount: response.totalOrderCount,
            });
            console.log(duplicatedOrdersData.length);
        } catch {
            console.log("Failed to fetch data");
        }
    },
}));
