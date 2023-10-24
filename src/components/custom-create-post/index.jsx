import {
  Alert,
  Button,
  Form,
  Input,
  Space,
  Spin,
  Typography
} from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { getTags } from "../../api/Tag";
import Container from "../../components/utils/Container";
import ButtonConfirm from "./components/button-confirm/ButtonConfirm";
import TextEditor from "./components/text-editor/TextEditor";
import { contentFieldAtom } from "./store/content-field";
import * as S from "./styles";
import { upload } from "../../api/FileUpload";

const { Text } = Typography;
const { TextArea } = Input;
const { Item } = Form;

// this function formatting array come from database to select option array shap (ant-design select options)
export function formatSelectOptions(arr) {
  let options = [];
  arr.forEach((tag) => {
    options.push({ value: tag.id, label: tag.name });
  });
  return options;
}

const urlToObject = async (img, name) => {
  const response = await fetch(img);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], name, { type: blob.type });
  return file;
};

const CustomCreatePost = ({ post, handleFetch, useStatus, useError }) => {
  const [form] = Form.useForm();
  const [contentField, setContentField] = useAtom(contentFieldAtom);
  const [tags, setTags] = useState();
  const [status, setStatus] = useStatus;
  const [error] = useError;
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (post?.cover) {
      urlToObject(
        `${import.meta.env.VITE_URL}/${post?.cover}`,
        post?.cover
      ).then((res) => {
        setFileList([
          {
            url: `${import.meta.env.VITE_URL}/${post?.cover}`,
            originFileObj: res,
          },
        ]);
      });
    }
  }, [post?.cover]);

  useEffect(() => {
    getTags().then((res) => {
      setTags(() => formatSelectOptions(res.data));
    });
  }, []);

  const onFinish = (values) => {
    setStatus("pending");
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", contentField);
    formData.append("tags", values.tags);
    if(fileList[0]) {
      upload(fileList[0].originFileObj).then((res) => {
        formData.append("cover", res.data);
        handleFetch(formData, resetFields);
      });
    } else {
      handleFetch(formData, resetFields);
    }
  };

  const normFile = (e) => {
    return e?.file;
  };

  const resetFields = () => {
    form.resetFields();
    setContentField("");
    setFileList([]);
  };

  const handleUploadChange = ({ fileList, file }) => {
    setFileList(fileList);
  };
  return (
    <S.CustomCreatePost>
      <Container>
        <S.Nav>
          <S.LeftNav>
            <S.Logo>FPTBlog</S.Logo>
            <S.ActionText>{post ? "Edit Post" : "Create Post"}</S.ActionText>
          </S.LeftNav>
          <ButtonConfirm />
        </S.Nav>
        {status === "pending" && (
          <Space
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Spin size="large"></Spin>
          </Space>
        )}

        {status === "rejected" && (
          <Alert
            style={{ marginBottom: "8px" }}
            message={
              <ul
                style={{
                  paddingLeft: "48px",
                }}
              >
                {error.map((e) => (
                  <li
                    style={{
                      listStyle: "initial",
                    }}
                  >
                    {e}
                  </li>
                ))}
              </ul>
            }
            type="error"
            closable
            onClose={() => setStatus("idle")}
          />
        )}
        {status === "resolved" && (
          <Alert
            message={
              post ? "Post updated with Success" : "Post Submitted with Success"
            }
            type="success"
            closable
            onClose={() => setStatus("idle")}
          />
        )}
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={
            post
              ? {
                  title: post.title,
                  tags: post.tags?.map((tag) => tag.id) || [],
                }
              : {}
          }
        >
          <S.FormMain>
            <S.FormMainTop>
              <S.Item
                name="cover"
                valuePropName="file"
                getValueFromEvent={normFile}
              >
                <S.Upload
                  className="upload"
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={handleUploadChange}
                >
                  {post?.cover ? "change " : "add a "}cover image
                </S.Upload>
              </S.Item>
                <S.Item
                name="title"
                style={{ minHeight: "62px", maxHeight: "62px" }}
              >
                <S.TextArea placeholder="New post title here..."></S.TextArea>
              </S.Item>


              <S.Item name="type">
                <S.Select
                  allowClear
                  options={[{ value: 'blog', label: 'blog' }, { value: 'video', label: 'video' }]}
                  optionFilterProp="label"
                  placeholder="Select post type...  "
                  bordered={false}
                />
              </S.Item>
              <br />

              <S.Item name="tags">
                <S.Select
                  mode="multiple"
                  allowClear
                  options={tags}
                  optionFilterProp="label"
                  placeholder="Add tags..."
                  bordered={false}
                />
              </S.Item>
            </S.FormMainTop>

            <TextEditor />
          </S.FormMain>

          <S.FormFooter>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={status === "pending"}
            >
              Submit
            </Button>
          </S.FormFooter>
        </Form>
      </Container>
    </S.CustomCreatePost>
  );
};

export default CustomCreatePost;
