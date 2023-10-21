import React, { ChangeEvent, useEffect } from "react";
import Link from "next/link";
import {
  MovieDbPopularResponse,
  MovieDbPopularResponseItem,
} from "@/types/movieDbApi";
import { fetchOptions } from "@/lib/fetchConfig";
import { useImageConfig } from "@/context/imageConfigContext";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import MovieItem from "@/components/movieItem";
import backgroundImg from "../../../public/background.jpg";

const maxItems = 500;
interface Context {
  query: {
    page: string;
  };
}

export const getServerSideProps = async (context: Context) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${context.query.page}`,
    fetchOptions,
  );
  const jsonResult: MovieDbPopularResponse = await res.json();

  const maxPages = maxItems / jsonResult.results.length;
  return { props: { data: jsonResult, page: context.query.page, maxPages } };
};

interface MovieProps {
  data: MovieDbPopularResponse;
  page: string;
  maxPages: number;
}
export default function Movie({ data, page, maxPages }: MovieProps) {
  const router = useRouter();

  const onPaginationChange = (_: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/movies/${page}`);
  };

  return (
    <div
      className={"flex flex-col h-[100vh] bg-cover bg-no-repeat"}
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      <main className="flex-1 overflow-auto py-5 px-2 md:px-8 flex flex-col items-center mb-16">
        <div className="flex flex-col gap-8 max-w-5xl lg:grid lg:grid-cols-2">
          {data.results.map((movie: MovieDbPopularResponseItem) => {
            return <MovieItem key={movie.id} movie={movie} />;
          })}
        </div>
      </main>
      <div className="bg-glass shadow-glass backdrop-blur-glass border border-glass border-t-gray-700 border-t-2 fixed bottom-0 w-full h-16">
        <Pagination
          className="flex justify-center py-4 "
          count={maxPages}
          variant="outlined"
          shape="rounded"
          page={Number(page)}
          onChange={onPaginationChange}
        />
      </div>
    </div>
  );
}
