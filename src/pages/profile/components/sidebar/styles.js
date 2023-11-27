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

export const Item = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;

  .anticon {
    font-size: 20px;
    color: ${(props) => props.theme.base[50]};
  }
`;

export const Title = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;

  .anticon {
    font-size: 20px;
    color: ${(props) => props.theme.base[50]};
  }
`;

export const Text = styled(Typography.Text)`
  font-size: 16px;
  color: ${(props) => props.theme.cardSecondaryColor};
`;

export const Image = styled.img`
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  margin-left: 30px;
  margin-top: 60px;
`;