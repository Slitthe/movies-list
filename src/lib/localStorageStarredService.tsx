export function getStarredStatus(id: number) {
  const localStorageEntry = localStorage.getItem("starredList");
  const starredList = localStorageEntry ? JSON.parse(localStorageEntry) : [];

  return starredList.includes(id);
}

export function toggleStarredStatus(id: number) {
  const localStorageEntry = localStorage.getItem("starredList");
  let starredList = localStorageEntry ? JSON.parse(localStorageEntry) : [];

  const isAlreadyStarred = starredList.includes(id);

  console.log({ isAlreadyStarred });
  if (isAlreadyStarred) {
    starredList = starredList.filter((starredId: number) => id !== starredId);
  } else {
    starredList.push(id);
  }

  localStorage.setItem("starredList", JSON.stringify(starredList));
}
