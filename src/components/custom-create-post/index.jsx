import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  Space,
  Spin,
  Typography,
  message
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
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

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

const validFormData = (formData) => {
  if(formData){
    if(!formData.title){
      message.error('Invalid post title!');
      return false;
    }
    if(!formData.tags || !formData.tags.length){
      message.error('Please select tag!');
      return false;
    }
    if(!formData.content || formData.content.length < 40){
      message.error('Invalid post content! (min: 40 characters)');
      return false;
    }
    if(!formData.postType){
      message.error('Invalid post type!');
      return false;
    }
    if(!formData.cover || !formData.cover.includes('http')){
      message.error('Please upload cover image!');
      return false;
    }
  } else {
    return false;
  }

  return true;
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
  const [cover, setCover] = useState('');
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);


   useEffect(() => {
    if (post?.cover) {
      setCover(post?.cover);
    }
  }, [post?.cover]);

  useEffect(() => {
    getTags().then((res) => {
      setTags(() => formatSelectOptions(res.data));
    });
  }, []);



  const onFinish = (values) => {
    let formData = {...values, content: contentField, cover: cover};
    if(validFormData(formData)){
      setStatus("pending");
      handleFetch({...formData, cover: cover }, resetFields);
    };
  }

  const failureImg =
  'data:image/png;base64,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';


  const resetFields = () => {
    form.resetFields();
    setContentField("");
    setFileList([]);
  };

  const handleUploadChange = ({ fileList, file }) => {
    setLoading(true);
    setSubmitDisable(true);
    console.log('handleUploadChange',fileList);
    setFileList(fileList);
    upload(fileList[0].originFileObj)
    .then((res) => {
      setCover(res.data);
      setLoading(false);
      setSubmitDisable(false);
      // form.setFieldValue('cover', res.data);
    })
    .catch((err) => {
      message('error  upload file');
      setLoading(false);
      setSubmitDisable(false);
    });
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
                  postType: post.postType
                }
              : {}
          }
        >
          <S.FormMain>
            <S.FormMainTop>
                {!cover && <div style={{ width: '0px', height: '20px', margin: '10px', display: 'inline-block' }}></div>}
                {cover && cover.includes('http') && <div style={{width: '500px', height: '150px', margin: '10px 10px 10px 0px', display: 'inline-block'}}>
                  {loading ? <LoadingOutlined /> : <Image
                    width={500}
                    height={150}
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
                {cover ? "change " : "add a "}cover image
              </S.Upload>


              <S.Item
                name="title"
                style={{ minHeight: "62px", maxHeight: "62px" }}
              >
                <S.TextArea placeholder="New post title here..."></S.TextArea>
              </S.Item>


              <S.Item name="postType">
                <S.Select
                  allowClear
                  options={[{ value: 'Blog', label: 'Blog' }, { value: 'Video', label: 'Video' }]}
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
              disabled={status === "pending" || submitDisable}
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
