import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

import parse from "html-react-parser";
import { format } from "date-fns";

import { useUserStore } from "../../store/user";
import { getBlog, getPostBySlug, updateBlog } from "../../api/Blog";

import NewComment from "./components/new-comment/NewComment";
import CommentsList from "./components/CommentsList";
import SidebarRight from "./components/sidebar-right/SidebarRight";
import SidebarRight1 from "./components/sidebar-right/SidebarRight1";

import * as S from "./styles";
import SidebarLeft from "./components/sidebar-left/SidebarLeft";
import { USER_DEFAULT_IMG, getUserInfo } from "../../utils/utils";
import { Button, Skeleton, Tag, Form, Input } from "antd";
import ListLoading from "../../components/LoadingList";
import RejectForm from "./RejectForm";
import { ModalForm, ProFormText, ProFormTextArea } from "@ant-design/pro-form";


// import { format } from "date-fns";

const Post = (props) => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const authUser = getUserInfo();
  const role = authUser?.role;
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [form] = Form.useForm();
  //const [reason, setReason] = useState("");
  // const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  //const [visible2, setVisible2] = useState(false);



  function refresh() {
    setTimeout(() => {
      navigate(0);
    }, 500);
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleApprove = () => {
    updateBlog(post.id, { postStatus: 'Publish', approverId: authUser.id })
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

  const handleReject = (data) => {
    updateBlog(post.id, { postStatus: 'Rejected', approverId: authUser.id, ...data })
      .then((res) => {
        //console.log("AAA", res);
        setStatus("resolved");
        refresh();
      })
      .catch((e) => {
        setStatus("rejected");
        refresh();
      });
    //console.log("AAAAAAA", data);   
  }

  useEffect(() => {
    setStatus("pending");
    getPostBySlug(slug)
      .then((res) => {
        if (res.data[0]) {
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
      <>
        <S.Layout>
          <SidebarLeft postId={post.id} commentsCount={post.comments.filter(c => c.commentType =='Comment' && c.status == 'Active').length} />
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
                      {(post.postStatus == 'Draft') && <Button onClick={handleApprove} type="primary" style={{ marginRight: '10px' }}>
                        Approve
                      </Button>}
                      {(post.postStatus == 'Draft' || post.postStatus == 'Rejected') &&
                        <ModalForm
                          title="RejectDraft"
                          modalProps={{
                            width: 500,
                            destroyOnClose: true,
                          }}
                          name="reject-draft"
                          key="reject-draft"
                          submitter={{
                            render: (props, defaultDoms) => {
                              return [
                                // ...defaultDoms,
                                <Button
                                  key="cancel"
                                  onClick={() => {
                                    setVisible1(false);
                                  }}
                                >
                                  Hủy
                                </Button>,
                                <Button
                                  key="ok"
                                  type="primary"
                                  onClick={() => {
                                    try {
                                      props.form.validateFields().then((values) => {
                                        handleReject(values)
                                        props.reset();
                                      });
                                    } catch (error) {
                                      console.log(`error`, error);
                                    }
                                  }}
                                >
                                  Tạo
                                </Button>,
                              ];
                            },
                          }}
                          visible={visible1}
                          trigger={<Button style={{ backgroundColor: 'red', margin: '10px' }} onClick={() => setVisible1(true)} type="primary">{post.postStatus == 'Draft' ? 'Reject':'New Reject Reason'}</Button>}
                        >
                          <RejectForm />
                        </ModalForm>
                      }
                      {/* adjust approval */}
                      {(authUser?.id === post.approver?.id && post.postStatus == 'Rejected') && <Button onClick={handleApprove} type="primary" style={{ marginRight: '10px' }}>
                        Approve
                      </Button>}
                      {(authUser?.id === post.approver?.id && post.postStatus == 'Publish') &&
                        <ModalForm
                          title="RejectPublish"
                          modalProps={{
                            width: 500,
                            destroyOnClose: true,
                          }}
                          name="reject-publish"
                          key="reject-publish"
                          submitter={{
                            render: (props, defaultDoms) => {
                              return [
                                // ...defaultDoms,
                                <Button
                                  key="cancel"
                                  onClick={() => {
                                    setVisible(false);
                                  }}
                                >
                                  Hủy
                                </Button>,
                                <Button
                                  key="ok"
                                  type="primary"
                                  onClick={() => {
                                    try {
                                      props.form.validateFields().then((values) => {
                                        handleReject(values)
                                        props.reset();
                                      });
                                    } catch (error) {
                                      console.log(`error`, error);
                                    }
                                  }}
                                >
                                  Tạo
                                </Button>,
                              ];
                            },
                          }}
                          visible={visible}
                          trigger={<Button style={{ backgroundColor: 'red' }} onClick={() => setVisible(true)} type="primary">Reject</Button>}
                        >
                          <RejectForm />
                        </ModalForm>
                      }
                    </div>
                  )}

                </S.WrapperDetails>
                <S.Title level={2}>{post.title}</S.Title>
                <S.Tags>
                  {post.tags?.map((tag) => (
                    <S.Tag to={`/tags/${tag.id}`} key={tag.id} className="tag">
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
                {post.postStatus != 'Draft' && (<S.CommentsTitle level={3}>{post.postStatus == 'Rejected' ? 'Reject Reason' : 'Comment'}</S.CommentsTitle>)}
                {Object.keys(authUser).length !== 0 && post.postStatus == 'Publish' && (
                  <NewComment postId={post.id} />
                )}
                {status === "resolved" && <CommentsList postId={post.id} commentType={post.postStatus == 'Rejected' ? 'RejectReason' : 'Comment'}/>}
              </S.Comments>
            </S.Article>
          </S.Content>


          {
            post.postStatus == "Draft" ? (
              <SidebarRight
                author={post.author}
              />
            ) : (
              <SidebarRight1
                author={post.author}
                approver={post.approver}
              />
            )
          }
          {/* 
              <SidebarRight1
               author={post.author}
               approver={post.approver}
             /> */}


          {/* <SidebarRight
            author={post.author}
          /> */}
        </S.Layout >

      </>
    );
  }
};
export default Post;
