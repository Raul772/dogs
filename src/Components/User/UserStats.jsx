import { lazy, Suspense, useEffect } from "react";
import { STATS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { Head } from "../Helper/Head";
import { Loading } from "../Helper/Loading";

const UserStatsGraphs = lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET(token);

      await request(url, options);
    }

    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error>{error}</Error>;
  if (data)
    return (
      <Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </Suspense>
    );

  return null;
};

export default UserStats;
