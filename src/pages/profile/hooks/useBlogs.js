import { useEffect, useState } from "react";
import { getBlogs } from "../../../api/Blog";

export default function useBlogs(pageNumber, authorId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    getBlogs(pageNumber, { AuthorId: authorId, postStatus: 'Publish', orderBy: 'createAt-des', PageSize: 2 })
      .then((res) => {
        // if (Object.keys(res.data).length === 0) return;

        let { total, pageSize, current, data } = res;
        setPosts((prevBlogs) => {

          let tmp = prevBlogs?.filter((p) => p.author.id === authorId);
          return [...tmp, ...data];
        });
        const lastPage = Math.ceil(total / pageSize);
        setHasMore(current < lastPage);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [pageNumber, authorId]);

  return { loading, error, posts, hasMore };
}
