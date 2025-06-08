import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import app from '../index';

const prisma = new PrismaClient();

describe('認証API', () => {
  beforeAll(async () => {
    // テスト用のユーザーを作成
    const hashedPassword = await bcrypt.hash('password', 10);
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
      },
    });
  });

  afterAll(async () => {
    // テスト用のユーザーを削除
    await prisma.user.deleteMany({
      where: {
        email: 'test@example.com',
      },
    });
    await prisma.$disconnect();
  });

  describe('POST /api/auth/login', () => {
    it('正しい認証情報でログインできること', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).toHaveProperty('name', 'Test User');
    });

    it('間違ったパスワードでログインできないこと', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'メールアドレスまたはパスワードが間違っています。');
    });

    it('存在しないユーザーでログインできないこと', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'メールアドレスまたはパスワードが間違っています。');
    });

    it('メールアドレスが未指定の場合エラーになること', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'password',
        });

      expect(response.status).toBe(400);
    });

    it('パスワードが未指定の場合エラーになること', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
        });

      expect(response.status).toBe(400);
    });
  });
}); 