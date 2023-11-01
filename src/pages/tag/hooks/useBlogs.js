import { useEffect, useState } from "react";
import { getBlogs } from "../../../api/Blog";

export default function useBlogs(pageNumber, tagId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    getBlogs(pageNumber, { tagId: tagId })
      .then((res) => {
        if (Object.keys(res.data).length === 0) return;
        let { total, pageSize, current, data } = res;

        setPosts((prevBlogs) => {
          return [...prevBlogs, ...data];
        });

        const lastPage = Math.ceil(total / pageSize);
        setHasMore(current < lastPage);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, [pageNumber, tagId]);
  return { loading, error, posts, hasMore };
}
