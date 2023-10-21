import { MovieDbPopularResponseItem } from "@/types/movieDbApi";

export function mapItemsWithNumbering(
  items: MovieDbPopularResponseItem[],
  page: number,
  pageSize: number,
  isDescending: boolean,
): MovieDbPopularResponseItem[] {
  const itemsCopy = [...items];
  return itemsCopy.map((item: MovieDbPopularResponseItem, index: number) => {
    const offset = isDescending ? itemsCopy.length - index - 1 : index;
    const itemIndex = pageSize * page + offset;

    return {
      ...item,
      index: itemIndex + 1,
    };
  });
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  const lastSpace = text.lastIndexOf(" ", maxLength);

  if (lastSpace === -1) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text.substring(0, lastSpace) + "...";
  }
}
