import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "./PhotoDelete.module.css";

export const PhotoDelete = ({ id }) => {
  const token = window.localStorage.getItem("token");
  const { url, options } = PHOTO_DELETE(id, token);
  const { error, loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm("Tem certeza que deseja deletar essa foto?");

    if (confirm) {
      const { response } = await request(url, options);

      if (response.ok) {
        window.location.reload();
      }
    }
  }

  return (
    <>
      <button
        disabled={loading}
        onClick={handleClick}
        className={styles.delete}>
        {loading ? "Deletando..." : "Deletar"}
      </button>
    </>
  );
};
