import express from 'express';
import catRouter from './api/routes/catRoutes.js';
import userRouter from './api/routes/userRoutes.js';
import authRouter from './api/routes/auth-router.js'
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/public', express.static('public'));

app.use('/api/v1/cats', catRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;