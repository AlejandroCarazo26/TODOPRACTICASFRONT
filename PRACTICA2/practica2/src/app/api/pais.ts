

import { Country } from "../types";
import { api } from "./api";

export const getCountryByName = async (name: string) => {
    const respuesta = await api.get<Country[]>(`/name/${name}`);
    return respuesta;
}
