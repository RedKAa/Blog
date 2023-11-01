import { forwardRef, useRef, useCallback } from "react";
import useUsers from "../../../hooks/useUsers";
import { useAtom } from "jotai";
import { pageNumberAtom } from "../../../store/page-number";

import * as S from "./styles";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { USER_DEFAULT_IMG } from "../../../../../utils/utils";

function UsersFilter({ q }) {
  const [pageNumber, setPageNumber] = useAtom(pageNumberAtom);
  const { loading, users, error, hasMore } = useUsers(pageNumber, q);

  console.log(users);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPageNumber]
  );
  return (
    <div className="users-filter">
      {users.map((user, index) => {
        if (users.length === index + 1) {
          return <User key={user.id} ref={lastUserElementRef} user={user} />;
        } else {
          return <User key={user.id} user={user} />;
        }
      })}
      {users.length === 0 && <Empty />}
    </div>
  );
}

const User = forwardRef(({ user }, ref) => {
  return (
    <Link to={`/user/${user.id}`}>
      <S.User ref={ref}>
        <S.Image
          src={(user.avatarLink && user.avatarLink.length > 20)
            ? `${user.avatarLink}`
            : USER_DEFAULT_IMG}
          alt={`${user.userName}`}
          height={32}
          width={32}
        />
        <div>
          <S.Title level={4}>
            {user.userName}
          </S.Title>
          <S.Text>{user.role}</S.Text>
        </div>
      </S.User>
    </Link>
  );
});

export default UsersFilter;
