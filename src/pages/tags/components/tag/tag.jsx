import { forwardRef } from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

const tag = forwardRef(({ tag }, ref) => {
  return (
    <S.Tag ref={ref} subjectStatus={tag.status}>
      <S.TitleLink to={`/tags/${tag.id}`}>
        <S.Title level={3}>
          <S.Prefix>#</S.Prefix>
          {tag.name}
        </S.Title>
      </S.TitleLink>
      <S.TitleLink to={`/subject/${tag.subjectId}`}>
        <S.Title level={1}>
          <S.Prefix>- </S.Prefix>
          {tag.subject.name}

          {/* {tag.subject.status === 'Disable' ? ' - not active at FPTU' : ''} */}

        </S.Title>
      </S.TitleLink>
      {/* <S.Paragraph>{tag._count.posts} post</S.Paragraph> */}
    </S.Tag>
  );
});

export default tag;
