import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomCreatePost from "../../components/custom-create-post";
import { Provider } from "jotai";
import { contentFieldAtom } from "../../components/custom-create-post/store/content-field";
import { updateBlog, getPostBySlug } from "../../api/Blog";

const EditPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [postStatus, setPostStatus] = useState("idle");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPostStatus("pending");
    getPostBySlug(slug)
      .then((res) => {
        console.log(res.data[0]);
        setPost(res.data[0]);
        setPostStatus("resolved");
      })
  }, [slug]);

  useEffect(() => {
    if (postStatus === "rejected") {
      navigate("/", { replace: true });
    }
  }, [navigate, postStatus]);

  const handleFetch = (values) => {
    updateBlog(post.id, values)
      .then((res) => {
        setStatus("resolved");
      })
      .catch((e) => {
        setStatus("rejected");
      });
  };
  if (postStatus === "resolved") {
    return (
      <div>
        <Provider initialValues={[[contentFieldAtom, post.content]]}>
          <CustomCreatePost
            post={post}
            handleFetch={handleFetch}
            useStatus={[status, setStatus]}
            useError={[error, setError]}
          />
        </Provider>
      </div>
    );
  }
};

export default EditPost;
