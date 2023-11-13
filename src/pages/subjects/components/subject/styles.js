import styled from "styled-components";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { device } from "../../../../utils/device";

const getBorderColor = (status) => {
  if (status === 'Disable') {
    return '#C0C0C0'; // Disable color
  } else {
    return '#00FF00'; // Active color
  }
};
export const Subject = styled.div`
  padding: 24px;
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 8px;
  box-shadow: 0 0 0 1px ${(props) => props.theme.cardBorder};
  border-top: 16px solid ${(props) => getBorderColor(props.subjectStatus)};
  margin-bottom: 16px;

  @media ${device.md} {
    margin-bottom: 0px;
  }
`;

export const TitleLink = styled(Link)`
  display: inline-block;
  color: ${(props) => props.theme.subjectColor};
  padding: 4px 8px;
  margin-left: -8px;
  border-radius: 6px;

  &:hover {
    color: ${(props) => props.theme.subjectColorHover};
    background: ${(props) => props.theme.subjectBgHover};
    box-shadow: inset 0 0 0 1px rgba(247, 223, 30, 0.1),
      inset 0 0 0 1px rgba(247, 223, 30, 0.1),
      inset 0 0 0 1px rgba(247, 223, 30, 0.1);
  }
`;

export const Prefix = styled.span`
  color: ${(props) => props.theme.subjectPrefix};
`;

export const Title = styled(Typography.Title)`
  && {
    color: inherit;
    font-size: 19px;
    font-weight: 700;
    line-height: 28px;
    margin: 0px;
  }
`;

export const Paragraph = styled(Typography.Paragraph)`
  color: ${(props) => props.theme.cardColor};
`;
