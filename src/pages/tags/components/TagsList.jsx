import { useCallback, useRef, useState } from "react";
import useTags from "../hooks/useTags";
import Tag from "./tag/tag";
import styled from "styled-components";
import { device } from "../../../utils/device";
import ListLoading from "../../../components/LoadingList";
import { Empty } from "antd";
const StyledTagList = styled.section`
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

const TagsList = ({ q, pageNumberState }) => {
  const [pageNumber, setPageNumber] = pageNumberState;
  const { loading, tags, error, hasMore } = useTags(pageNumber, q);

  const observer = useRef();

  const lastTagElementRef = useCallback(
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
  console.log('tag:',tags);
  return (
    <StyledTagList>
      {tags.map((tag, index) => {
        if (tags.length === index + 1) {
          return <Tag key={tag.id} ref={lastTagElementRef} tag={tag} />;
        } else {
          return <Tag key={tag.id} tag={tag} />;
        }
      })}
      <ListLoading loading={loading} length={1}/>
      {!loading && tags.length == 0 && <Empty />}
    </StyledTagList>
  );
};

export default TagsList;
