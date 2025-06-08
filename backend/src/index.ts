import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// ルートの設定
app.use('/api/auth', authRoutes);

// エラーハンドリング
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'サーバーエラーが発生しました。' });
});

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app; 