import { useAtom } from "jotai";
import { FileTextOutlined, MessageOutlined } from "@ant-design/icons";
import { userAtom } from "../../atom/user";
import * as S from "./styles";

const SideBar = () => {
  const [user] = useAtom(userAtom);

  console.log(user);
  let totalposts = 0;
  let totalcomments = 0;

  if(user.createPosts) {
    totalposts = user.createPosts.length;
  }
  if(user.comments) {
    totalcomments = user.comments.length;
  }

  return (
    <S.Sidebar>
      <S.Card>
        <S.Item>
          <FileTextOutlined />
          <S.Text>{totalposts} posts published</S.Text>
        </S.Item>
        <S.Item>
          <MessageOutlined />
          <S.Text>{totalcomments} comments written</S.Text>
        </S.Item>
      </S.Card>
    </S.Sidebar>
  );
};

export default SideBar;
