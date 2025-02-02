import { useParams } from "react-router-dom";
import Feed from "../Feed/Feed";
import { Head } from "../Helper/Head";

export const UserProfile = () => {
  const { user } = useParams();

  return (
    <>
      <Head title={user}/>
      <section className="container mainContainer">
        <h1 className="title">{user}</h1>
        <Feed user={user} />
      </section>
    </>
  );
};
