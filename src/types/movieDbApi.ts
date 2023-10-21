export interface MovieDbPopularResponseItem {
  original_title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  id: number;
  release_date: string;
  overview: string;
  index?: number;
}
export interface MovieDbPopularResponse {
  page: number;
  total_pages: number;
  results: MovieDbPopularResponseItem[];
}
