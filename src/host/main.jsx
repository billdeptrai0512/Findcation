import { useParams, Outlet } from "react-router-dom";
import { useState } from "react";
import { HostProvider, useHost } from "./hostContext";
import { EditorDraftProvider } from "./editorDraftContext";
import { useMediaQuery } from "react-responsive";
import Header from "./header/main";
import Footer from "./footer/main";
import ContactEditor from "./contacts/editor";
import styles from "./host.module.css";

function HostLayout() {
  const { host, loading } = useHost();
  const [ openContactEditor, setOpenContactEditor ] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 750px)'})
  if (loading) return <div>Loading...</div>;
  if (!host) return <div>No host found</div>;

  return (
    <div className={styles.hostContainer}>
      {!isMobile && <Header host={host} />}
      <Outlet context={{ staycations: host.staycations, setOpenContactEditor: setOpenContactEditor }}/> 
      {openContactEditor && <ContactEditor data={openContactEditor}  setOpenContactEditor={setOpenContactEditor} />}
      <Footer host={host} />
    </div>
  );
}

export default function HostDashBoard() {
  const { hostId } = useParams();

  return (
    <HostProvider hostId={hostId}>
      <EditorDraftProvider>
        <HostLayout />
      </EditorDraftProvider>
    </HostProvider>
  );
}
