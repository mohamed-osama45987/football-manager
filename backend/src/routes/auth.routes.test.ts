import request from 'supertest';
import app from '../app';
import { User } from '../models/User';
import bcrypt from 'bcrypt';




describe('Auth Routes', () => {
    const baseUrl = '/api/v1/auth';
    it('registers a new user and returns token', async () => {
        const res = await request(app)
            .post(baseUrl)
            .send({ email: 'test@example.com', password: '12345678' })
            .expect(200);

        expect(res.body.token).toBeDefined();
    });

    it('fails with wrong password', async () => {
        await User.create({ email: 'test@example.com', name: 'test', password: await bcrypt.hash('12345678', 10) });
        const res = await request(app)
            .post(baseUrl)
            .send({ email: 'test@example.com', password: 'wrong' })
        expect(res.status).toBe(401)
        expect(res.body.error).toBe('Invalid credentials')
    });
});
