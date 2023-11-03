import { useEffect, useState } from "react";
import styled from "styled-components";
import { checkSaved, nbrSavesByPost, toggleSave } from "../../../../api/save";
import WarningAuthMessage from "../../../../components/warning-auth-message";
import { useUserStore } from "../../../../store/user";
import BookmarkFilled from "./BookmarkFilled";
import BookmarkOutlined from "./BookmarkOutlined";
import { Reaction } from "../sidebar-left/styles";
import { getUserInfo } from "../../../../utils/utils";

const SaveIcon = ({ postId }) => {
  const [savedActive, setSavedActive] = useState(false);
  const [nbrSaves, setNbrSaves] = useState(0);
  const [isModalOpen, setIsMOdalOpen] = useState(false);
  const authUser = getUserInfo();

  useEffect(() => {
    if (Object.keys(authUser).length !== 0) {
      checkSaved(postId)
        .then((res) => {
          console.log('checkSaved stt',res);
          if (res.status === 200) {
            setSavedActive(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [savedActive, postId, authUser]);

  useEffect(() => {
    nbrSavesByPost(postId)
      .then((res) => {
        console.log('nbrSavesByPost stt',res);

        if (res.status === 200) {
          setNbrSaves(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [savedActive, postId]);

  const handleToggleSave = () => {
    if (Object.keys(authUser).length === 0) {
      setIsMOdalOpen(true);
    } else {
      toggleSave(postId)
        .then((res) => {
          if (res.status === 201) {
            setSavedActive((prevSavedActive) => !prevSavedActive);
          }
          if(res.status === 200) {
            setSavedActive(res.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <>
      <WarningAuthMessage isModalOpenState={[isModalOpen, setIsMOdalOpen]} />
      <Reaction>
        {!savedActive ? (
          <BookmarkOutlined onClick={handleToggleSave} />
        ) : (
          <BookmarkFilled onClick={handleToggleSave} />
        )}
        <Counter $active={savedActive}>{nbrSaves}</Counter>
      </Reaction>
    </>
  );
};

const Counter = styled.span`
  color: ${(props) =>
    props.$active ? "rgb(79,70,229)" : props.theme.btnGhostColor};
`;

export default SaveIcon;
