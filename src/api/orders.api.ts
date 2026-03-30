import axiosInstance from "./axios";

export const ordersList = async (data: { filterOn: []; sortOn: [] }) => {
    const res = await axiosInstance.post("/v3/api/orders/list", data);
    return res.data;
};
