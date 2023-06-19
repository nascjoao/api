import express from 'express';
import getPinnedRepos from '../services/getPinnedRepos';

const router = express.Router();

router.get('/', (_, res) => {
  return res.status(200).end();
});

router.get('/repos/pinned', async (_, res) => {
  try {
    if (!process.env.GH_TOKEN) throw new Error('GitHub token was not received for request');
    const repos = await getPinnedRepos(process.env.GH_TOKEN);
    return res.status(200).json(repos);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Error';
    return res.status(400).header('Error', message).end();
  }
});

export default router;
