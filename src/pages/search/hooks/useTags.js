import { useEffect, useState } from "react";
import { getTags } from "../../../api/Tag";

export default function useTags(pageNumber, q) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setTags([]);
  }, [q]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getTags({ page: pageNumber, q })
      .then((res) => {
        if (Object.keys(res.data).length === 0) return;
        let { total, pageSize, current, data } = res;
        setTags((prevTags) => {
          return [...prevTags, ...data];
        });

        const lastPage = Math.ceil(total / pageSize);
        setHasMore(current < lastPage);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [pageNumber, q]);
  return { loading, error, tags, hasMore };
}
