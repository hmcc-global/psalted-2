import express, { Request, Response } from 'express';
import { connectToDB } from './mongoose';
import userRouter from './routes/user.routes';

const app = express();
const dev_port: number = 1337;

// TODO-YY: Remove
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(express.json());

app.use('/api/users', userRouter);

// Starts the server after connecting to the database
connectToDB()
  .then(() => {
    app.listen(dev_port, () => {
      console.log(`Server is running on port ${dev_port}.`);
    });
  })
  .catch(() => {
    console.log('Server failed to start.');
  });
