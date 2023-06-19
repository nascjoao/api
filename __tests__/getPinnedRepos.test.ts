import getPinnedRepos from '../services/getPinnedRepos';
import axios from 'axios';

const ghToken = process.env.GH_TOKEN || '';

jest.mock('axios');

const ghResponseMock = {
  data: {
    user: {
      pinnedItems: {
        nodes: [
          {
            name: 'Repo 1',
            url: 'https://nasc.dev/repo/1',
            description: 'Example 1',
            openGraphImageUrl: 'https://nasc.dev/img/1',
            stargazers: {
              totalCount: 1,
            },
            homepageUrl: 'https://nasc.dev/repo/1',
          },
          {
            name: 'Repo 2',
            url: 'https://nasc.dev/repo/2',
            description: 'Example 2',
            openGraphImageUrl: 'https://nasc.dev/img/2',
            stargazers: {
              totalCount: 2,
            },
            homepageUrl: 'https://nasc.dev/repo/2',
          },
          {
            name: 'Repo 3',
            url: 'https://nasc.dev/repo/3',
            description: 'Example 3',
            openGraphImageUrl: 'https://nasc.dev/img/3',
            stargazers: {
              totalCount: 3,
            },
            homepageUrl: 'https://nasc.dev/repo/3',
          }
        ]
      }
    }
  }
};

test('Should return an array of objects', async () => {
  (axios.post as jest.Mock).mockResolvedValue({ data: ghResponseMock });
  const repos = await getPinnedRepos(ghToken);
  expect(repos).toEqual([
    {
      name: 'Repo 1',
      url: 'https://nasc.dev/repo/1',
      description: 'Example 1',
      imageURL: 'https://nasc.dev/img/1',
      stars: 1,
      homepageUrl: 'https://nasc.dev/repo/1',
    },
    {
      name: 'Repo 2',
      url: 'https://nasc.dev/repo/2',
      description: 'Example 2',
      imageURL: 'https://nasc.dev/img/2',
      stars: 2,
      homepageUrl: 'https://nasc.dev/repo/2',
    },
    {
      name: 'Repo 3',
      url: 'https://nasc.dev/repo/3',
      description: 'Example 3',
      imageURL: 'https://nasc.dev/img/3',
      stars: 3,
      homepageUrl: 'https://nasc.dev/repo/3',
    },
  ]);
});

const ghUnexpectedResponses = [
  {
    data: {
      error: 'Unexpected Error'
    }
  },
  {
    error: 'Unexpected Error'
  },
];

test('Should throw error if GH response is unexpected', async () => {
  for (const unexpectedResponse of ghUnexpectedResponses) {
    (axios.post as jest.Mock).mockResolvedValue({ data: unexpectedResponse });
    await expect(getPinnedRepos(ghToken)).rejects.toThrow(/^The GitHub API returned an unexpected response. Hence, it was not possible to get the proper info.$/);
  }
});
