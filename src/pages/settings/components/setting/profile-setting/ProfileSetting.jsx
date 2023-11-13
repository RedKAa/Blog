import { useEffect, useState } from "react";
import { Form, Upload, Button, Space, Spin, Alert, Image, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// import userDefaultImg from "../../public/img/user.png";
import { useUserStore } from "../../../../../store/user";
import { updateUser } from "../../../../../api/User";
import * as S from "./styles";
//import { getUserInfo } from "../../../../../utils/utils";
import { getUserInfo, setUserInfo } from "../../../../../utils/utils";
import { upload } from "../../../../../api/FileUpload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";



const ProfileSetting = () => {
  const authUser = getUserInfo();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [cover, setCover] = useState('');
  const [loading, setLoading] = useState(false);

  const failureImg =
    'data:image/png;base64,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';



  // setCover(authUser.avatarLink);

  useEffect(() => {
    if (authUser?.avatarLink) {
      setCover(authUser?.avatarLink);
    }
  }, [authUser?.avatarLink]);

  const onFinish = (values) => {
    setStatus("pending");
    console.log('value', { avatarLink: cover, bio: values.bio });
    const tmp = { avatarLink: cover, bio: values.bio };
    updateUser({ avatarLink: cover, bio: values.bio })
      .then(() => {
        setUserInfo({ ...authUser, ...tmp });
        setStatus("resolved");
      })
      .catch((e) => {
        setError(e);
        setStatus("rejected");
      });
  };


  const handleUploadChange = ({ fileList, file }) => {
    setLoading(true);
    console.log('handleUploadChange', fileList);
    setFileList(fileList);
    upload(fileList[0].originFileObj)
      .then((res) => {
        setCover(res.data);
        setLoading(false);
        // form.setFieldValue('cover', res.data);
      })
      .catch((err) => {
        message('error  upload file');
        setLoading(false);
      });
  };

  const normFile = (e) => {
    console.log(e);
    if (e?.file?.status === "removed") {
      return null;
    }
    return e?.file;
  };
  return (
    <div>
      {status === "pending" && (
        <Space
          style={{
            width: "100%",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Spin size="large" />
        </Space>
      )}
      {status === "rejected" && <Alert message={error} type="error" />}
      {status === "resolved" && (
        <Alert
          message="your information updated with success"
          type="success"
          closable
        />

      )}

      <S.ProfileSetting>
        <S.Title level={3}>User</S.Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            email: authUser.email,
            username: authUser.userName,
            bio: authUser.bio,
          }}
          onFinish={onFinish}
        >
          <S.Item name="email" label={<S.LabelText>Email</S.LabelText>}>
            <S.Input placeholder="john.doe@example.com" disabled={true} />
          </S.Item>
          <S.Item name="username" label={<S.LabelText>Username</S.LabelText>}>
            <S.Input placeholder="johndoe" disabled={true} />
          </S.Item>
          <S.Item
            name="img"
            label={<S.LabelText>Profile image</S.LabelText>}
          >
          </S.Item>

          {!cover && <div style={{ width: '0px', height: '20px', margin: '10px', display: 'inline-block' }}></div>}
          {cover && cover.includes('http') && <div style={{ width: '200px', height: '150px', margin: '20px 5px 50px 0px', display: 'inline-block' }}>
            {loading ? <LoadingOutlined /> : <Image
              width={200}
              height={200}
              style={{ 'border-radius': '50%' }}
              alt={'cover'}
              src={cover}
              fallback={failureImg}
            />}
          </div>}
          <S.Upload
            className="upload"
            maxCount={1}
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            {cover ? "change " : "add a "} avatar image
          </S.Upload>






          <S.Item name="bio" label={<S.LabelText>Bio</S.LabelText>}>
            <S.TextArea rows={3} placeholder="A short bio..." />
          </S.Item>
          <S.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              disabled={status === "pending"}
            >
              Save Profile information
            </Button>
          </S.Item>
        </Form>
      </S.ProfileSetting>
    </div>
  );
};

export default ProfileSetting;