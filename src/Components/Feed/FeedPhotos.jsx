import { useEffect } from "react";
import { PHOTOS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { Loading } from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";
import { FeedPhotosItem } from "./FeedPhotosItem";

export const FeedPhotos = ({ setModalPhoto, user, page, setInfinite }) => {
  const { data, request, error, loading } = useFetch();

  useEffect(() => {
    const total = 3;
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({
        page: page,
        total: total,
        user: user,
      });
      const { response, dataResponse } = await request(url, options);

      if (response && response.ok && dataResponse.length < total) {
        setInfinite(false);
      }
    }

    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error>{error}</Error>;
  if (loading) return <Loading />;
  if (data && data.length >= 1) {
    return (
      <ul className={`animeLeft ${styles.feed}`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  }

  return null;
};
