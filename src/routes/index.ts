import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  return res.status(200).end();
});

export default router;
