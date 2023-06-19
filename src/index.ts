import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();
const PORT = process.env.PORT || 3001;
const originAllowed = process.env.NODE_ENV === 'development' ? '*' : 'https://nasc.dev';
const server = express();

server.use(express.json());
server.use(cors({ origin: originAllowed }));
server.use('/', router);

server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));

export default server;
