import { useState } from "react";

export function useLocalStorageState() {
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  return [watched, setWatched];
}
