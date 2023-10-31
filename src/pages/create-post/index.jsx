import { useState } from "react";

import { createBlog } from "../../api/Blog";

import CustomCreatePost from "../../components/custom-create-post";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/utils";

// this function formatting array come from database to select option array shap (ant-design select options)
export function formatSelectOptions(arr) {
  let options = [];
  arr.forEach((tag) => {
    options.push({ value: tag.id, label: tag.name });
  });
  return options;
}
const CreatePost = () => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const authUser = getUserInfo();
  const handleFetch = (formData, resetFields) => {
    createBlog(formData)
      .then((res) => {
        resetFields();
      })
      .then(() => {
        navigate(`/user/${authUser.id}`);
      })
  };

  return (
    <div>
      <CustomCreatePost
        handleFetch={handleFetch}
        useStatus={[status, setStatus]}
        useError={[error, setError]}
      />
    </div>
  );
};

export default CreatePost;
