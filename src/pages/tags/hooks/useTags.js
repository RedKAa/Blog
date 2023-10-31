import { useEffect, useState } from "react";
import { getTags } from "../../../api/Tag";

export default function useTags(pageNumber, q) {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setTags([]);
  }, [q]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTags({
      page: pageNumber,
      q: q,
    })
      .then((res) => {
        let { total,current,pageSize, data } = res;
        setTags((prevTags) => {
          return [
            ...new Map(
              [...prevTags, ...data].map((tag) => [tag["id"], tag])
            ).values(),
          ];
        });
        const lastPage =  Math.ceil(total / pageSize);
        setHasMore(current < lastPage);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [pageNumber, q]);

  return { loading, tags, error, hasMore };
}
