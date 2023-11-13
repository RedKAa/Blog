import { forwardRef } from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

const subject = forwardRef(({ subject }, ref) => {
  return (
    <S.Subject ref={ref} subjectStatus={subject.status}>
      <S.TitleLink to={`/subjects/${subject.id}`}>
        <S.Title level={3}>
          <S.Prefix>#</S.Prefix>
          {subject.name}
        </S.Title>
      </S.TitleLink>
    </S.Subject>
  );
});

export default subject;
