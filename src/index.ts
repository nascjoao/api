import express from 'express';
import cors from 'cors';
import router from './routes';

const PORT = process.env.PORT || 3001;
const server = express();

server.use(express.json());
server.use(cors({ origin: 'https://nasc.dev' }));
server.use(router);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
