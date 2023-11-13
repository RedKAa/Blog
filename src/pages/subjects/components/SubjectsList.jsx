import { useCallback, useRef, useState } from "react";
import useSubjects from "../hooks/useSubjects";
import Subject from "./subject/subject";
import styled from "styled-components";
import { device } from "../../../utils/device";
import ListLoading from "../../../components/LoadingList";
import subject from "./subject/subject";
import { Empty } from "antd";
const StyledSubjectList = styled.section`
  @media ${device.md} {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  @media ${device.lg} {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`;

const SubjectsList = ({ q, pageNumberState }) => {
  const [pageNumber, setPageNumber] = pageNumberState;
  const { loading, subjects, error, hasMore } = useSubjects(pageNumber, q);

  const observer = useRef();

  const lastSubjectElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);

    },
    [loading, hasMore]
  );
  console.log('subject:',subjects);
  return (
    <StyledSubjectList>
      {subjects.map((subject, index) => {
        if (subjects.length === index + 1) {
          return <Subject key={subject.id} ref={lastSubjectElementRef} subject={subject} />;
        } else {
          return <Subject key={subject.id} subject={subject} />;
        }
      })}
      <ListLoading loading={loading} length={1}/>
      {!loading && subjects.length == 0 && <Empty />}
    </StyledSubjectList>
  );
};

export default SubjectsList;
