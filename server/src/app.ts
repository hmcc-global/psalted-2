import express from 'express';
import { connectToDB } from './mongoose';
import { getRoutes } from './routes';
import * as path from 'path';
import dotenv from 'dotenv';

const app = express();
const dev_port: number = 1337;

dotenv.config();

// Use EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use('/api', getRoutes());

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
