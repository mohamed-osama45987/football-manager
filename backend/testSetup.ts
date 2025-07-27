
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { agenda } from './src/jobs/agenda';

let mongo: MongoMemoryServer;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose.connect(uri);
});

afterEach(async () => {
    const collections = await mongoose.connection.db?.collections();
    if (!collections) return;
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await agenda.stop()
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
});
