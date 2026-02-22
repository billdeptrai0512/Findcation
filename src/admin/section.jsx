import { ChevronRight, ChevronLeft } from "lucide-react";
const sections = [
  { key: "traffic", label: "Traffic" },
  { key: "host", label: "Host" },
  { key: "suggestion", label: "Suggestion" },
];

export default function SectionSelector({ isMobile, selected, setSelected, counts }) {
  const currentIndex = sections.findIndex(s => s.key === selected);

  const handleNext = () => {
    setSelected(sections[(currentIndex + 1) % 3].key);
  };

  const handlePrev = () => {
    setSelected(sections[(currentIndex - 1 + 3) % 3].key);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center",
        textAlign: "center",
        marginTop: "1em",
        width: "100%"
      }}
    >
      {/* MOBILE MODE → show chevron left */}
      {isMobile && (
        <ChevronLeft
          size={32}
          style={{ marginRight: "1em", cursor: "pointer" }}
          onClick={handlePrev}
        />
      )}

      {/* CONTENT BOX */}
      {!isMobile ? (
        /* DESKTOP → show all 3 boxes */
        sections.map(sec => (
          <div
            key={sec.key}
            style={{
              padding: "4em",
              borderRadius: "12px",
              cursor: "pointer",
              background:
                selected === sec.key
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              transition: "0.2s",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            }}
            onClick={() => setSelected(sec.key)}
          >
            <h3 style={{ margin: 0, fontSize: "1.5em" }}>
              {counts[sec.key]}
            </h3>
            <span>{sec.label}</span>
          </div>
        ))
      ) : (
        /* MOBILE → show only the current box */
        <div
          key={sections[currentIndex].key}
          style={{
            padding: "4em",
            borderRadius: "12px",
            cursor: "pointer",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            transition: "0.2s",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.5em" }}>
            {counts[selected]}
          </h3>
          <span>{sections[currentIndex].label}</span>
        </div>
      )}

      {/* MOBILE MODE → show chevron right */}
      {isMobile && (
        <ChevronRight
          size={32}
          style={{ marginLeft: "1em", cursor: "pointer" }}
          onClick={handleNext}
        />
      )}
    </div>
  );
}
