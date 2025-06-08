import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// ログインエンドポイント
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // バリデーション
  if (!email || !password) {
    return res.status(400).json({ message: 'メールアドレスとパスワードは必須です。' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが間違っています。' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが間違っています。' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  }
});

export default router; 