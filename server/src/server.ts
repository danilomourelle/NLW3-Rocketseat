import express from 'express';
import path from 'path';
import chalk from 'chalk';
import cors from 'cors';
import { AddressInfo } from 'net';
import 'express-async-errors'

import './database/connection';
import errorHandler from './errors/handler'
import routes from './routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
  const address = server.address() as AddressInfo;
  console.log(chalk.yellow(`\nServidor on-line em http://localhost/${address.port}`));
})

export default app
