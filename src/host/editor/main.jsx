import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useHost } from "../hostContext";
import { useEditorDraft } from "../editorDraftContext";
import cloneDeep from "lodash/cloneDeep";

export default function EditorPage() {
  const { staycationId } = useParams();
  const { host } = useHost();
  const { setOriginal, setDraft  } = useEditorDraft();

  const staycation = host?.staycations.find(
    (s) => s.id === parseInt(staycationId, 10)
  );

  // Clone staycation data when component mounts or staycation changes
  useEffect(() => {
    if (staycation) {
      const copy = cloneDeep(staycation);
      setOriginal(copy);
      setDraft(copy);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staycation]);

  return (
    <Outlet />
  );
}
