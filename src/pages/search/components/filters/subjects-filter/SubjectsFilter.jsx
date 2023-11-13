import React, { useRef, useCallback } from "react";
import useSubjects from "../../../hooks/useSubjects";
import HashIcon from "components/HashIcon";
import "./subjects-filter.css";
import { useAtom } from "jotai";
import { pageNumberAtom } from "../../../store/page-number";
import * as S from "./styles";
import { Empty } from "antd";

function SubjectsFilter({ q }) {
  const [pageNumber, setPageNumber] = useAtom(pageNumberAtom);
  const { loading, error, subjects, hasMore } = useSubjects(pageNumber, q);

  const observer = useRef();
  const lastSubjectElementRef = useCallback(
    (node) => {
      console.log("hello from last element");
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log("increase page");
        if (entries[0].isIntersecting && hasMore) {
          console.log("increase page");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPageNumber]
  );
  return (
    <section className="subjects-filter">
      {subjects.map((subject, index) => {
        if (subjects.length === index + 1) {
          return <Subject key={subject.id} ref={lastSubjectElementRef} subject={subject} />;
        } else {
          return <Subject key={subject.id} subject={subject} />;
        }
      })}
      {subjects.length === 0 && <Empty />}
    </section>
  );
}

const Subject = React.forwardRef(({ subject }, ref) => {
  return (
    <S.Subject ref={ref}>
      <S.HashIconWrapper>
        <HashIcon />
      </S.HashIconWrapper>
      <S.Title level={4}>
        <S.Link to={`/subjects/${subject.id}`}>{subject.name} </S.Link>
      </S.Title>
    </S.Subject>
  );
});
export default SubjectsFilter;
