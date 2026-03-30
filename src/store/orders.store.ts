import { create } from "zustand";
import { ordersList } from "../api/orders.api";
import type { OrdersListResponse, OrdersListItem } from "../types/orders.types";

interface OrdersState {
    list: OrdersListItem[];
    totalOrderCount: number;
    ordersList: (data: { filterOn: []; sortOn: [] }) => Promise<void>;
}

export const useOrdersStore = create<OrdersState>((set) => ({
    list: [],
    totalOrderCount: 0,
    ordersList: async (data) => {
        try {
            const response: OrdersListResponse = await ordersList(data);
            const ordersData = response.orders || [];

            // const duplicatedOrdersData = Array.from({ length: 10 }).flatMap(() =>
            //     ordersData.map((order: OrdersListItem) => ({
            //         ...order,
            //         key: `${order.nestOrderNumber}`,
            //     })),
            // );
            set({
                list: ordersData,
                totalOrderCount: response.totalOrderCount,
            });
            console.log(ordersData);
        } catch {
            console.log("Failed to fetch data");
        }
    },
}));
