import {  Avatar, List, Skeleton } from 'antd';


function ListLoading({ loading, length }) {

const listData = Array.from({ length: length }).map((_, i) => ({
   href: 'https://ant.design',
   title: `ant design part ${i + 1}`,
   avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
   description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
   content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
   }));


  return (
   <>
      {loading && <List
      itemLayout="vertical"
      size="large"
      dataSource={listData}
      renderItem={(item) => (
      <List.Item
         key={item.title}
         actions={
            !loading
            ? [
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
               ]
            : undefined
         }
         extra={
            !loading && (
            <img
               width={272}
               alt="logo"
               src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
            )
         }
      >
         <Skeleton loading={loading} active avatar>
            <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
            />
            {item.content}
         </Skeleton>
      </List.Item>
      )}
   /> }
   </>
  );
}

export default ListLoading;
