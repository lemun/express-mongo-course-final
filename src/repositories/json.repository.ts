import jsonfile from "jsonfile";
import { logger } from "../middleware/logger.middleware";

export async function readJSONFile(filePath: string) {
    try {
        const data = await jsonfile.readFile(filePath);
        return data;
    } catch (error) {
        logger.error(error, "Error reading JSON file");
        throw error;
    }
}

export async function writeJSONFile(filePath: string, data: any) {
    try {
        await jsonfile.writeFile(filePath, data);
    } catch (error) {
        logger.error(error, "Error writing JSON file");
        throw error;
    }
}