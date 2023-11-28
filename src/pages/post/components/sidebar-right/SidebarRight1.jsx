import { format } from "date-fns";
import React from 'react';
import * as S from "./styles.js";
import { USER_DEFAULT_IMG, getUserInfo } from "../../../../utils/utils.js";

const authUser = getUserInfo();
const SidebarRight = ({ author, approver }) => {
  return (
    <S.SidebarRight>
      <S.Space>
        <S.Card>
          <S.Header>
            <S.Link to={`/user/${author?.id}`}>
              <S.WrapperImage>
                <S.Image
                  src={`${(author?.avatarLink && author?.avatarLink.length > 20)
                    ? `${author?.avatarLink}`
                    : USER_DEFAULT_IMG}`}
                  alt="author image"
                />
              </S.WrapperImage>
              <S.SubTitle>
                {author?.userName}
              </S.SubTitle>
            </S.Link>
          </S.Header>
          <S.Description>{author?.role}</S.Description>
          <S.Description>{author?.bio}</S.Description>
          <S.Details>
            <ul>
              <li>
                <S.Key>Joined</S.Key>
                <S.Value>
                  <time dateTime={author?.createAt}>
                    {format(
                      new Date(author?.createAt || Date.now()),
                      "MMM d, y"
                    )}
                  </time>
                </S.Value>
              </li>
            </ul>
          </S.Details>
        </S.Card>
      </S.Space>
      {authUser.role != 'Teacher' && (
        <S.Space>
          <S.CardT>
            <S.Header>
              <S.Link to={`/user/${approver?.id}`}>
                <S.WrapperImage>
                  <S.Image
                    src={`${(approver?.avatarLink && approver?.avatarLink.length > 20)
                      ? `${approver.avatarLink}`
                      : USER_DEFAULT_IMG}`}
                    alt="author image"
                  />
                </S.WrapperImage>
                <S.SubTitle>
                  {approver?.userName}
                </S.SubTitle>
              </S.Link>
            </S.Header>
            <S.Description>{approver?.role}</S.Description>
            <S.Description>{approver?.bio}</S.Description>
            <S.Details>
              <ul>
                {/* <li>
                <S.Key>Joined</S.Key>
                <S.Value>
                  <time dateTime={approver?.createAt}>
                    {format(
                      new Date(approver?.createAt || Date.now()),
                      "MMM d, y"
                    )}
                  </time>
                </S.Value>
              </li> */}
                <li>
                  <S.Key>Người Kiểm Duyệt</S.Key>
                </li>
              </ul>
            </S.Details>
          </S.CardT>
        </S.Space>
      )}


    </S.SidebarRight>
  );
};
export default SidebarRight;
