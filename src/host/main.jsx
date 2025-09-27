import { useParams, Outlet } from "react-router-dom";
import { HostProvider, useHost } from "./hostContext";
import Header from "./header";
import Footer from "./footer/main";
import styles from "./host.module.css";

function HostLayout() {
  const { host, loading } = useHost();

  if (loading) return <div>Loading...</div>;
  if (!host) return <div>No host found</div>;

  return (
    <div className={styles.hostContainer}>
      <Header host={host} />
      <Outlet context={{ staycations: host.staycations }}/> 
      <Footer host={host} />
    </div>
  );
}

export default function HostDashBoard() {
  const { hostId } = useParams();

  return (
    <HostProvider hostId={hostId}>
      <HostLayout />
    </HostProvider>
  );
}
