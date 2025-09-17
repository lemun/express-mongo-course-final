import express from "express";
import { Request, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";
import { logRequests, logger } from "../middleware/logger.middleware";
import { assertEnvironment, connectDB } from "../utils/utils";
import authRouter from "../routes/auth.route";
dotenv.config();

const app = express();
const port = assertEnvironment("PORT");
const mongoURI = assertEnvironment("MONGO_URI");

app.use(express.json());
app.use(logRequests);

app.use("/api/auth", authRouter);

app.get('/api', (req: Request, res: Response) => {
    res.send('Hello World');
});

connectDB(mongoURI).then(() => {
    app.listen(port, () => {
        logger.info(`Server is running on port ${port}`);
    });
}).catch((error) => {
    logger.error(error);
});

export default app;