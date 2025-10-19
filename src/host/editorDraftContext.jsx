import { createContext, useContext, useState, useMemo } from "react";
import isEqual from "lodash/isEqual";

const EditorDraftContext = createContext(null);

export function EditorDraftProvider({ children }) {
  const [original, setOriginal] = useState(null);
  const [draft, setDraft] = useState(null);

  const hasChanged = useMemo(() => {
    if (!original || !draft) return false;
    return !isEqual(original, draft);
  }, [original, draft]);

  const resetDraft = () => {
    setDraft(original ? structuredClone(original) : null);
  };

  return (
    <EditorDraftContext.Provider
      value={{ original, setOriginal, draft, setDraft, hasChanged, resetDraft }}
    >
      {children}
    </EditorDraftContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEditorDraft() {
  return useContext(EditorDraftContext);
}
