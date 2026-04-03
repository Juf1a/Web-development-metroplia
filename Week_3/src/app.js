import express from 'express';
import catRouter from './api/routes/catRoutes.js';
import userRouter from './api/routes/userRoutes.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/public', express.static('public'));

app.use('/api/v1/cats', catRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;