import { useAtom } from "jotai";
import { FileTextOutlined, MessageOutlined } from "@ant-design/icons";
import { userAtom } from "../../atom/user";
import * as S from "./styles";
import { Card, Space, Modal, Avatar } from "antd";
import { USER_DEFAULT_IMG, getUserInfo } from "../../../../utils/utils";
import { useState } from "react";

const SideBar = () => {
  const [user] = useAtom(userAtom);

  console.log(user);
  let totalposts = 0;
  let totalcomments = 0;

  if (user.createPosts) {
    totalposts = user.createPosts.length;
  }
  if (user.comments) {
    totalcomments = user.comments.length;
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <S.Sidebar>
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>

        <Card title="Badge" size="small">
          <S.Item>
            <S.Image
              src={`${(user.rank && user.rank.imgLink && user.rank.imgLink.length > 20)
                ? `${user.rank.imgLink}`
                : 'Nothing'}`}
              width="70"
              height="70"
              alt="said"
              onClick={showModal}
            />
            <Modal
              title={
                <div>
                  <Avatar
                    src={
                      user.rank && user.rank.imgLink && user.rank.imgLink.length > 20
                        ? user.rank.imgLink
                        : 'Nothing'
                    }
                    size={32}
                  />
                  {user?.rank?.name || 'Error display'}
                </div>
              }
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <p>{user?.rank?.description || 'Error display'}</p>
            </Modal>
          </S.Item>
        </Card>

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
      </Space>
    </S.Sidebar>
  );
};

export default SideBar;
