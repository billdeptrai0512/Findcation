// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Outlet } from "react-router-dom";
import { useState } from "react";
import { HostProvider, useHost } from "./hostContext";
import { EditorDraftProvider } from "./editorDraftContext";
import { useMediaQuery } from "react-responsive";
import Header from "./header/main";
import Footer from "./footer/main";
import Options from "./options/main";
import ContactEditor from "./contacts/editor";
import styles from "./host.module.css";

function HostLayout() {
  const { host, loading } = useHost();
  const [openContactEditor, setOpenContactEditor] = useState(null);
  const [openOptions, setOpenOptions] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 750px)' })

  if (loading || !host) return (
    <motion.div className={styles.hostContainer}>
      <AnimatePresence mode="wait" initial={false}>

        <motion.div
          key="spinner"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={styles.spinner}
        />

      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className={styles.hostContainer}>
      {!isMobile && <Header host={host} />}
      <Outlet context={{ staycations: host.staycations, setOpenContactEditor }} />
      {openOptions && <Options openOptions={openOptions} setOpenOptions={setOpenOptions} />}
      {openContactEditor && <ContactEditor data={openContactEditor} setOpenContactEditor={setOpenContactEditor} />}
      <Footer host={host} setOpenOptions={setOpenOptions} />
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
