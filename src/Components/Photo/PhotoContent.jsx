import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Image } from "../Helper/Image";
import { PhotoComments } from "./PhotoComments";
import styles from "./PhotoContent.module.css";
import { PhotoDelete } from "./PhotoDelete";

export const PhotoContent = ({ data: { photo, comments } }) => {
  const { data } = useContext(UserContext);

  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {data && data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} Kg</li>
            <li>
              {photo.idade} {photo.idade > 1 ? "anos" : "ano"}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
};
