import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import parse from "html-react-parser";
import { format } from "date-fns";

import { useUserStore } from "../../store/user";
import { getBlog, getPostBySlug, updateBlog } from "../../api/Blog";

import NewComment from "./components/new-comment/NewComment";
import CommentsList from "./components/CommentsList";
import SidebarRight from "./components/sidebar-right/SidebarRight";

import * as S from "./styles";
import SidebarLeft from "./components/sidebar-left/SidebarLeft";
import { USER_DEFAULT_IMG, getUserInfo } from "../../utils/utils";
import { Button, Skeleton, Tag } from "antd";
import ListLoading from "../../components/LoadingList";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const authUser = getUserInfo();
  const role = authUser?.role;
  const navigate = useNavigate();

  function refresh() {
    setTimeout(() => {
      navigate(0);
    }, 500);
  }

  const handleApprove = () => {
    updateBlog(post.id, {postStatus: 'Publish', approverId: authUser.id})
      .then((res) => {
        console.log(res);
        setStatus("resolved");
        refresh();
      })
      .catch((e) => {
        setStatus("rejected");
        // navigate(0);
      });
  }

  const handleReject = () => {
    updateBlog(post.id, {postStatus: 'Rejected', approverId: authUser.id})
      .then((res) => {
        console.log(res);
        setStatus("resolved");
        refresh();
      })
      .catch((e) => {
        setStatus("rejected");
        // navigate(0);
    });
  }

  useEffect(() => {
    setStatus("pending");
    getPostBySlug(slug)
      .then((res) => {
        if(res.data[0]){
          setPost(res.data[0]);
          setStatus("resolved");
        }
      })
      .catch((e) => {
        setError(e);
        setStatus("rejected");
      });
  }, [slug]);

  if (status === "resolved") {
    return (
      <S.Layout>
          <SidebarLeft postId={post.id} commentsCount={post.comments?.length} />
          <S.Content>
          <S.Article>
            {post.cover && (
              <S.Cover
                src={`${post.cover}`}
                alt={post.id}
              />
            )}

            <S.Meta>
              <S.WrapperDetails>
                <S.Details>
                  <S.Avatar
                    src={`${(post.author.avatarLink && post.author.avatarLink.length > 20)
                      ? `${post.author.avatarLink}`
                      : USER_DEFAULT_IMG}`}
                    alt={`${post.author?.userName}`}
                    width="40"
                    height="40"
                  />
                  <div>
                    <S.AuthorName>
                      {post.author?.userName}
                    </S.AuthorName>
                    <S.PublishDate>
                      Posted on{" "}
                      {format(
                        new Date(post.createAt || Date.now()),
                        "MMM d, y"
                      )}
                    </S.PublishDate>
                  </div>
                </S.Details>

                {authUser?.id === post.author?.id && post.postStatus && post.postStatus == 'Draft' && (
                   <Tag color="magenta">Waiting for approval</Tag>
                )}
                {authUser?.id === post.author?.id && post.postStatus && post.postStatus == 'Publish' && (
                   <Tag color="green">Published</Tag>
                )}
                 {authUser?.id === post.author?.id && post.postStatus && post.postStatus == 'Rejected' && (
                   <Tag color="red">Rejected</Tag>
                )}

                {authUser?.id === post.author?.id && (
                  <S.AuthorActions>
                    <S.EditLink
                      to={`/post/${post.slug}/edit`}
                    >
                      Edit
                    </S.EditLink>
                  </S.AuthorActions>
                )}
                {role == 'Teacher' && (
                    <div>
                      {/* approve new */}
                     {(post.postStatus == 'Draft') && <Button onClick={handleApprove} type="primary" style={{marginRight: '10px'}}>
                        Approve
                      </Button>}
                      {(post.postStatus == 'Draft') && <Button onClick={handleReject} danger>
                        Reject
                     </Button>}

                      {/* adjust approval */}
                     {(authUser?.id === post.approver?.id && post.postStatus == 'Rejected') && <Button onClick={handleApprove} type="primary" style={{marginRight: '10px'}}>
                        Approve
                      </Button>}
                      {(authUser?.id === post.approver?.id && post.postStatus == 'Publish') && <Button onClick={handleReject} danger>
                        Reject
                     </Button>}
                     </div>
                 )}
              </S.WrapperDetails>
              <S.Title level={2}>{post.title}</S.Title>
              <S.Tags>
                {post.tags?.map((tag) => (
                  <S.Tag to={`/t/${tag.id}`} key={tag.id} className="tag">
                    <S.TagPrefix>#</S.TagPrefix>
                    {tag.name}
                  </S.Tag>
                ))}
              </S.Tags>
            </S.Meta>

            <S.Main>
              <div className="ql-snow">
                <div
                  className="ql-editor"
                  style={{
                    padding: "0px",
                    fontSize: "18px",
                    lineHeight: "30px",
                  }}
                >
                  {parse(`${post.content}`)}
                </div>
              </div>
            </S.Main>

            <S.Comments>
              <S.CommentsTitle level={3}>Comments</S.CommentsTitle>
              {Object.keys(authUser).length !== 0 && (
                <NewComment postId={post.id} />
              )}
              {status === "resolved" && <CommentsList postId={post.id} />}
            </S.Comments>
          </S.Article>
        </S.Content>
        <SidebarRight author={post.author} />
      </S.Layout>
    );
  }
};

export default Post;
