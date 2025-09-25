import jsonfile from "jsonfile";
import { logger } from "../middlewares/logger.middleware";
import path from "path";

export type Log = {
    userId: string;
    actions: [UserAction]
}

export type UserAction = {
    actionsLeft: number;
    lastAction: string;
    date: string;
}


export async function readJsonLog(): Promise<Log[]> {
    try {
        return await jsonfile.readFile(path.join(__dirname, '..', 'data', 'log.json'));
    } catch (error) {
        logger.error(error, "Error reading JSON file");
        throw error;
    }
}

export async function writeJsonLog(data: Log[]): Promise<void> {
    try {
        await jsonfile.writeFile(path.join(__dirname, '..', 'data', 'log.json'), data);
    } catch (error) {
        logger.error(error, "Error writing JSON file");
        throw error;
    }
}

const DAILY_ACTION_LIMIT = 10;

function getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
}

function isNewDay(lastActionDate: string): boolean {
    const today = getTodayDateString();
    return today !== lastActionDate;
}

export async function addAction(userId: number, action: string): Promise<boolean> {
    const data = await readJsonLog();
    const userIdString = userId.toString();
    
    const userIndex = data.findIndex((user: Log) => user.userId === userIdString);
    
    if (userIndex === -1) {
        await addUserToLog(userId);
        return addAction(userId, action);
    }
    
    const userActions = data[userIndex].actions[0];
    
    if (isNewDay(userActions.date)) {
        userActions.actionsLeft = DAILY_ACTION_LIMIT;
        userActions.date = getTodayDateString();
    }
    
    if (userActions.actionsLeft <= 0) {
        return false;
    }
    
    userActions.actionsLeft = userActions.actionsLeft - 1;
    userActions.lastAction = action;

    await writeJsonLog(data);
    return true;
}

export async function addUserToLog(userId: number): Promise<void> {
    const data = await readJsonLog();
    const userIdString = userId.toString();
    
    const userExists = data.some((user: Log) => user.userId === userIdString);

    if (!userExists) {
        const newUser: Log = {
            userId: userIdString,
            actions: [{
                actionsLeft: DAILY_ACTION_LIMIT,
                lastAction: "",
                date: getTodayDateString()
            }]
        };
        
        await writeJsonLog([...data, newUser]);
    }
}