import axios from 'axios';

type Response = {
  name: string;
  url: string;
  description: string | null;
  imageURL: string;
  stars: number;
  homepageUrl: string | null;
}

type Repo = {
  name: string;
  url: string;
  description: string | null;
  openGraphImageUrl: string;
  stargazers: {
    totalCount: number;
  }
  homepageUrl: string | null;
}

export default async function getPinnedRepos(gitHubToken: string): Promise<Response[]> {
  try {
    const { data } = await axios.post('https://api.github.com/graphql', {
      query: `query {
        user(login: "nascjoao") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name,
                url,
                description,
                openGraphImageUrl,
                stargazers {
                  totalCount
                }
              }
            } 
          } 
        }
      }`
    }, {
      headers: {
        'Authorization': `bearer ${gitHubToken}`,
      }
    });
    const repos = data.data.user.pinnedItems.nodes.map(
      ({ openGraphImageUrl, stargazers, ...repo }: Repo) => ({
        ...repo,
        imageURL: openGraphImageUrl,
        stars: stargazers.totalCount
      }),
    );
    return repos;
  } catch (error) {
    throw new Error('The GitHub API returned an unexpected response. Hence, it was not possible to get the proper info.');
  }
}
