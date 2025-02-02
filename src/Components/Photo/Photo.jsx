import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { Loading } from "../Helper/Loading";
import { PhotoContent } from "../Photo/PhotoContent";

export const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function getPhoto() {
      const { url } = PHOTO_GET(id);
      await request(url);
    }

    getPhoto();
  }, [request, id]);

  if (error) return <Error>{error}</Error>;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <PhotoContent single={true} data={data} />
      </section>
    );

  return null;
};
