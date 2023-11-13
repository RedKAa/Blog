import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { getComments } from "../../../api/Comment";
import { commentsAtom } from "../atom/comments";

export default function useComments(postId, pageNumber) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useAtom(commentsAtom);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setComments([]);
  }, [postId, setComments]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getComments(postId, pageNumber)
      .then((res) => {
        // if (Object.keys(res.data).length === 0) return;
        let { total,current,pageSize, data } = res;

        setComments((prevComments) => {
          return [
            ...new Map(
              [...prevComments, ...data].map((comment) => [
                comment["id"],
                comment,
              ])
            ).values(),
          ];
          //https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
          //return [...[...prevComments, ...records]];
        });

        const lastPage = Math.ceil(total / pageSize);
        setHasMore(current < lastPage);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [pageNumber, postId, setComments]);

  return { comments, loading, hasMore, error };
}
