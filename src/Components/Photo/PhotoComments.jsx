import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import styles from "./PhotoComments.module.css";
import { PhotoCommentsForm } from "./PhotoCommentsForm";

export const PhotoComments = ({ id, comments, single }) => {
  const [commentsList, setCommentsList] = useState(() => comments);
  const commentsSection = useRef();
  const { login } = useContext(UserContext);

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${single ? styles.single : ''}`}>
        {commentsList.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm single={single} id={id} setCommentsList={setCommentsList} />}
    </>
  );
};
