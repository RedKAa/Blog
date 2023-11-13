import { useEffect, useState } from "react";
import { getSubjects } from "../../../api/Subject";

export default function useSubjects(pageNumber, q) {
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setSubjects([]);
  }, [q]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSubjects({
      page: pageNumber,
      name: q,
    })
      .then((res) => {
        let { total,current,pageSize, data } = res;
        setSubjects((prevSubjects) => {
          return [
            ...new Map(
              [...prevSubjects, ...data].map((subject) => [subject["id"], subject])
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

  return { loading, subjects, error, hasMore };
}
