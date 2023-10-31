import { useEffect, useState } from "react";
import { getUsers } from "../../../api/User";

export default function useUsers(pageNumber, q) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setUsers([]);
  }, [q]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getUsers(pageNumber, { q })
      .then((res) => {
        if (Object.keys(res.data).length === 0) return;
        let { total, pageSize, current, data } = res;

        setUsers((prevUsers) => {
          return [...prevUsers, ...data];
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
  return { loading, error, users, hasMore };
}
