import { useEffect } from "react";
import { PHOTOS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { Loading } from "../Helper/Loading";
import { FeedPhotosItem } from "./FeedPhotosItem";
import styles from "./FeedPhotos.module.css";

export const FeedPhotos = () => {
  const { data, request, error, loading } = useFetch();

  useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      const { dataResponse } = await request(url, options);
      console.log(dataResponse);
    }

    fetchPhotos();
  }, [request]);

  if (error) return <Error>{error}</Error>;
  if (loading) return <Loading />;
  if (data) {
    return (
      <ul className={`animeLeft/ ${styles.feed}`}>
        {data.map((photo) => (
          <FeedPhotosItem key={photo.id} photo={photo} />
        ))}
      </ul>
    );
  }

  return null;
};
