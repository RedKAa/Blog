import { theme, Typography } from "antd";
import styled from "styled-components";

export const Sidebar = styled.aside``;
export const Card = styled.div`
  color: ${(props) => props.theme.cardSecondaryColor};
  background-color: ${(props) => props.theme.cardSecondaryBg};
  padding: 16px;

  box-shadow: 0 0 0 1px ${(props) => props.theme.cardSecondaryBorder};
  border-radius: 8px;
`;

export const ImageStudent = styled.img`
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  margin-top: 50px;
  border: solid 2px #008000;
  border-radius: 100%;
`;

export const ImageTeacher = styled.img`
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  margin-top: 50px;
  border: solid 2px #FF8C00;
  border-radius: 100%;
`;

export const ImageList = styled.ul`
  display: flex;
  gap: 50px;
`;

export const CenteredContainer = styled.div`
  margin-left: 95px;
  display: flex;
  justify-content: center;
`;