import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import { PhotoCommentsForm } from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

export const PhotoComments = ({ id, comments }) => {
  const [commentsList, setCommentsList] = useState(() => comments);
  const commentsSection = useRef();
  const { login } = useContext(UserContext);

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul ref={commentsSection} className={styles.comments}>
        {commentsList.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={id} setCommentsList={setCommentsList} />}
    </>
  );
};
