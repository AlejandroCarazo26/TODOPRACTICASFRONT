

import { Product, ProductsResponse } from "../types";
import { api } from "./api";

export const getAllProducts = async () => {
    const respuesta = await api.get<ProductsResponse>(`/products`);
    return respuesta;
};

export const getProductById = async (id: string | number) => {
    const respuesta = await api.get<Product>(`/products/${id}`);
    return respuesta;
};