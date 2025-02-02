import { useState } from "react";
import Enviar from "../../Assets/enviar.svg?react";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";

export const PhotoCommentsForm = ({ id, setCommentsList }) => {
  const [comment, setComment] = useState("");

  const { request, error } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    const token = window.localStorage.getItem("token");
    const { url, options } = COMMENT_POST(id, { comment }, token);
    const { response, dataResponse } = await request(url, options);

    if (response.ok) {
      setComment("");
      setCommentsList((commentsList) => [...commentsList, dataResponse]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textArea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error>{error}</Error>
    </form>
  );
};
