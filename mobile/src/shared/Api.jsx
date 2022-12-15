import { BaseURL } from "./Constant";
import axios from "axios";
export const request = axios.create({
    baseURL: BaseURL,
    headers: {
        'Accept': 'application/json',
    },
});