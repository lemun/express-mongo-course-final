import express from "express";
import { Request, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";
import { logRequests, logger } from "../middlewares/logger.middleware";
import { assertEnvironment, connectDB } from "../utils/utils";
import authRouter from "../routes/auth.route";
import usersRouter from "../routes/users.route";
import moviesRouter from "../routes/movies.route";
import { authenticateToken } from "../middlewares/jwt.middleware";

dotenv.config();

const app = express();
const port = assertEnvironment("PORT");
const mongoURI = assertEnvironment("MONGO_URI");

app.use(express.json());
app.use(logRequests);
app.use(session({
    name: "cookie",
    saveUninitialized: false,
    secret: assertEnvironment("SECRET_COOKIE"),
    resave: false,
}));

app.use("/api/auth", authRouter);
app.use("/api/users", authenticateToken, usersRouter);
app.use("/api/movies", authenticateToken, moviesRouter);

app.get('/api', (req: Request, res: Response) => {
    res.send('Server is alive!');
});

connectDB(mongoURI).then(() => {
    app.listen(port, () => {
        logger.info(`Server is running on port ${port}`);
    });
}).catch((error) => {
    logger.error(error);
});

export default app;
