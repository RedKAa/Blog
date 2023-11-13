import { useState } from "react";
import { useAtom } from "jotai";
import { Typography, Input } from "antd";
import { pageNumberAtom } from "./store/page-number";
import Container from "../../components/utils/Container";
import SubjectsList from "./components/SubjectsList";
import * as S from "./styles";

const { Title, Paragraph } = Typography;
function Subjects() {
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState("");
  const onSearch = (value) => {
    setPageNumber(1);
    setQuery(value);
  };
  return (
    <S.Subjects>
      <Container>
        <S.Nav>
          <S.Title>Top Subjects</S.Title>
          <S.Search className="input-search" onSearch={onSearch} />
        </S.Nav>
        <SubjectsList q={query} pageNumberState={[pageNumber, setPageNumber]} />
      </Container>
    </S.Subjects>
  );
}

export default Subjects;
