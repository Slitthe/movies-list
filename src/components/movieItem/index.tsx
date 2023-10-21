"use client";
import { MovieDbPopularResponseItem } from "@/types/movieDbApi";
import { useImageConfig } from "@/context/imageConfigContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getStarredStatus,
  toggleStarredStatus,
} from "@/lib/localStorageStarredService";
import clsx from "clsx";
import { LuExternalLink } from "react-icons/lu";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Rating } from "@mui/material";

interface MovieItemProps {
  movie: MovieDbPopularResponseItem;
}
export default function MovieItem({ movie }: MovieItemProps) {
  const {
    release_date,
    original_title,
    poster_path,
    vote_average,
    vote_count,
    overview,
  } = movie;

  const imageConfig = useImageConfig();
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    setIsStarred(getStarredStatus(movie.id));
  }, []);

  function toggleStarred() {
    toggleStarredStatus(movie.id);
    setIsStarred(getStarredStatus(movie.id));
  }

  const releaseYear = new Date(release_date).getFullYear();

  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }

    // Find the last space within the maxLength
    const lastSpace = text.lastIndexOf(" ", maxLength);

    if (lastSpace === -1) {
      // If there's no space within the maxLength, just truncate at maxLength
      return text.substring(0, maxLength) + "...";
    } else {
      // Truncate at the last space within the maxLength
      return text.substring(0, lastSpace) + "...";
    }
  }

  return (
    <div
      className={clsx(
        "flex flex-col md:flex-row bg-glass shadow-glass backdrop-blur-glass rounded-glass border border-glass relative",
        {
          ["bg-amber-300"]: isStarred,
          ["bg-starred"]: isStarred,
        },
      )}
    >
      <div
        onClick={toggleStarred}
        className="absolute right-4 top-4 cursor-pointer text-3xl text-yellow-400"
      >
        {isStarred ? (
          <AiFillStar className="fill-starred" />
        ) : (
          <AiOutlineStar />
        )}
      </div>
      <div className="w-full h-[200px] md:w-[200px] md:h-[300px]">
        {imageConfig && (
          <Image
            className={"w-full h-full object-cover rounded-glass"}
            src={`${imageConfig?.images?.secure_base_url}w500${poster_path}`}
            alt={`Poster for the movie: ${original_title}`}
            width={0}
            height={0}
            sizes={"100vw"}
          />
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 px-10">
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          className="text-blue-600 w-full hover:underline flex items-center justify-center text-center mb-4"
        >
          {original_title} ({releaseYear})
        </a>

        <div>{truncateText(overview, 150)}</div>
        <div className="text-center mt-auto">
          <Rating
            name="hover-feedback"
            className={"text-red-600"}
            value={vote_average}
            precision={0.25}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            disabled
            sx={{ "&.Mui-disabled": { opacity: 1 } }}
            max={10}
          />
        </div>
        <div className="text-center">
          <span className="font-bold ">{vote_average}/10</span> ({vote_count}{" "}
          votes)
        </div>
      </div>
    </div>
  );
}
