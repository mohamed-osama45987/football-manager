import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { agenda } from './jobs/agenda';

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI!).then(async () => {
    await agenda.start();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(err);
    process.exit(1);
})