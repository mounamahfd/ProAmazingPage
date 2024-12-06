export interface Contributor {
  name: string;
  githubUsername: string;
  role: string;
  avatarUrl: string;
  contributions: number;
}

export interface ContributionData {
  date: string;
  count: number;
}