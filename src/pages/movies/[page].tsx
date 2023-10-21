import React, { useState } from "react";
import {
  MovieDbPopularResponse,
  MovieDbPopularResponseItem,
} from "@/types/movieDbApi";
import { fetchOptions } from "@/lib/fetchConfig";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import MovieItem from "@/components/movieItem";
import backgroundImg from "../../../public/background.jpg";
import { mapItemsWithNumbering } from "@/lib/helpers";
import Head from "next/head";

const maxItems = 500;
const pageSize = 20;
interface Context {
  query: {
    page: string;
    order?: "DESC";
  };
}

export const getServerSideProps = async (context: Context) => {
  const isDescending = context.query?.order === "DESC";
  const maxPages = maxItems / pageSize;
  const currentPage = Number(context.query.page);

  const pageToFetch = isDescending ? maxPages - currentPage + 1 : currentPage;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageToFetch}`,
    fetchOptions,
  );

  const jsonResult: MovieDbPopularResponse = await res.json();

  const result = isDescending
    ? jsonResult.results.reverse()
    : jsonResult.results;
  return {
    props: {
      data: {
        ...jsonResult,
        results: mapItemsWithNumbering(
          result,
          pageToFetch - 1,
          20,
          isDescending,
        ),
      },
      page: context.query.page,
      maxPages,
    },
  };
};

interface MovieProps {
  data: MovieDbPopularResponse;
  page: string;
  maxPages: number;
}
export default function Movie({ data, page, maxPages }: MovieProps) {
  const router = useRouter();

  const onPaginationChange = (_: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/movies/${page}${order === "DESC" ? "?order=DESC" : ""}`);
  };
  const [order, setOrder] = useState("ASC");

  function onAscendingChange(event: SelectChangeEvent) {
    console.log(event.target.value);
    setOrder(event.target.value);

    router.push(
      `/movies/${page}${event.target.value === "DESC" ? "?order=DESC" : ""}`,
    );
  }

  return (
    <div
      className={"flex flex-col h-[100vh] bg-cover bg-no-repeat"}
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      <Head>
        <title>Movies - Page {page}</title>
      </Head>
      <main className="flex-1 overflow-auto py-5 px-2 md:px-8 flex flex-col items-center mb-16">
        <div className="flex flex-col gap-8 max-w-5xl lg:grid lg:grid-cols-2">
          {data.results.map((movie: MovieDbPopularResponseItem) => {
            return <MovieItem key={movie.id} movie={movie} />;
          })}
        </div>
      </main>
      <div className="bg-glass shadow-glass backdrop-blur-glass border border-glass border-t-gray-700 border-t-2 fixed bottom-0 w-full h-16">
        <div className="flex w-full justify-center items-center">
          <FormControl className="mr-4">
            <InputLabel id="items-order">Sort</InputLabel>
            <Select
              labelId="items-order"
              id="demo-simple-select"
              value={order}
              label="Age"
              size={"small"}
              onChange={onAscendingChange}
            >
              <MenuItem value={"ASC"}>Ascending</MenuItem>
              <MenuItem value={"DESC"}>Descending</MenuItem>
            </Select>
          </FormControl>
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
    </div>
  );
}
