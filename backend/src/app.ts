import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import teamsRoutes from './routes/teams.routes';
import transferRoutes from './routes/transfer.routes';
import morgan from 'morgan';

dotenv.config();


const app = express();
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(cors());
app.use(express.json());

const apiPrefix = `/api/${process.env.ApiVersion || 'v1'}`;

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/team`, teamsRoutes);
app.use(`${apiPrefix}/transfer`, transferRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});


export default app;