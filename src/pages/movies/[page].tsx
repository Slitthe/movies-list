import { useEffect } from "react";
import Link from "next/link";
import {
  MovieDbPopularResponse,
  MovieDbPopularResponseItem,
} from "@/types/movieDbApi";
import { fetchOptions } from "@/lib/fetchConfig";
import { useImageConfig } from "@/context/imageConfigContext";

interface Context {
  query: {
    page: string;
  };
}
export const getServerSideProps = async (context: Context) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${context.query.page}`,
    fetchOptions,
  );
  const jsonResult: MovieDbPopularResponse = await res.json();
  return { props: { data: jsonResult, page: context.query.page } };
};

interface MovieProps {
  data: MovieDbPopularResponse;
  page: string;
}
export default function Movie({ data, page }: MovieProps) {
  const config = useImageConfig();
  useEffect(() => {});

  console.log({ config, data });
  return (
    <>
      <main>
        <div>
          {data.results.map((movie: MovieDbPopularResponseItem) => {
            return <div key={movie.id}>{movie.original_title}</div>;
          })}
        </div>
      </main>
      Page: {page} / 25
      <Link href={`/movies/${Number(page) + 1}`}>Next</Link>
    </>
  );
}
