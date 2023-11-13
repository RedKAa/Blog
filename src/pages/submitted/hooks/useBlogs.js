import { useEffect, useState } from "react";
import { getBlogs } from "../../../api/Blog";
import { getUserInfo } from "../../../utils/utils";

export default function useBlogs(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const authUser = getUserInfo();
  useEffect(() => {
    setLoading(true);
    setError(false);
    getBlogs(pageNumber, {postStatus:'Draft', AuthorId: authUser.id, orderBy: 'createAt-des', PageSize: 2})
      .then((res) => {
        if (Object.keys(res.data).length === 0) return;
        let { total,current,pageSize, data } = res;

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
  }, [pageNumber]);
  return { loading, error, posts, hasMore };
}
