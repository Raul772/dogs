import { useEffect } from "react";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { Loading } from "../Helper/Loading";
import { PhotoContent } from "../Photo/PhotoContent";
import styles from "./FeedModal.module.css";

export const FeedModal = ({ photo, setModalPhoto }) => {
  const { request, data, loading, error } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);

    async function fetchPhoto() {
      const { response, dataResponse } = await request(url, options);
    }

    fetchPhoto();
  }, [photo, request]);

  function handleOusideClick({ target, currentTarget }) {
    if (target === currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOusideClick}>
      {error && <Error>{error}</Error>}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};
