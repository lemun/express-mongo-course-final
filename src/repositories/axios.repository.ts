import axios from "axios";
import { logger } from "../middleware/logger.middleware";

export async function getDataFromAPI(url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        logger.error(error, "Error getting data from API");
        throw error;
    }
}