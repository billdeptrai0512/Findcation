// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function ProgressBar({ percentage}) {

  return (
    <div style={{ height: 6, background: "#eee",  borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${percentage}%`,  background: "#000", height: "100%", transition: "width 0.3s" }} />
    </div>
  );
}

