import { BaseAPIURL } from "./Constant";
import axios from "axios";
export const request = axios.create({
    baseURL: BaseAPIURL,
    headers: {
        'Accept': 'application/json',
    },
});