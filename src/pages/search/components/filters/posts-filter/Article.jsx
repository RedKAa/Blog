import React from "react";
import { Button, Typography, Tag } from "antd";
import { format } from "date-fns";
import {
  HeartOutlined,
  MessageOutlined,
  BookOutlined,
} from "@ant-design/icons";
import "../../../../profile/components/article/article.css";

const { Title, Text } = Typography;
const Article = React.forwardRef(({ post }, ref) => {
  const { title, createAt, author, tags } = post;
  return (
    <div ref={ref} className="story">
      <article className="story__body">
        <div className="story__top">
          <img
            className="story__author-pic"
            src={`${(author.avatarLink && author.avatarLink.length > 20)
              ? `${author.avatarLink}`
              : USER_DEFAULT_IMG}`}
            alt="said"
            width="34"
            height="34"
          />
          <div>
            <Title className="story__author-name" level={5}>
              {author.userName}
            </Title>
            <Text>
              <time dateTime={createAt}>
                {format(new Date(createAt), "MMM d, y")}
              </time>
            </Text>
          </div>
        </div>
        <div style={{ marginLeft: "44px" }}>
          <Title className="story__title" level={3}>
            {title}
          </Title>
          <div className="story__tags">
            {tags.map((t) => (
              <Text key={t.tag.id}>#{t.tag.name}</Text>
            ))}
          </div>
          <div className="story__bottom">
            <div className="story__details">
              <Text>
                <HeartOutlined style={{ marginRight: "8px" }} />
                <span>540 reactions</span>
              </Text>
              <Text>
                <MessageOutlined style={{ marginRight: "8px" }} />
                <span> 42 comments</span>
              </Text>
            </div>
            <div className="story__save">
              <Text style={{ fontSize: "12px", color: "rgb(82,82,82)" }}>
                9 min
              </Text>
              <Button className="bookmark" type="text" size="small">
                <BookOutlined style={{ fontSize: "16px" }} />
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
});

export default Article;
