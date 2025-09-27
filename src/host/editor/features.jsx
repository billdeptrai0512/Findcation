// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { defaultOptions, premiumOptions, safetyOptions } from "../../assets/featureIcons";
import { useHost } from "../hostContext";
import styles from "../host.module.css";

export default function EditorFeatures() {
  const { host, updateStaycation } = useHost();
  const { staycationId } = useParams();

  const staycation = host?.staycations.find(
    (s) => s.id === parseInt(staycationId, 10)
  );

  if (!staycation) return null;

  const toggleFeature = (featureName) => {
    const hasFeature = staycation.features.includes(featureName);
    const updatedFeatures = hasFeature
      ? staycation.features.filter((f) => f !== featureName)
      : [...staycation.features, featureName];

    updateStaycation(staycation.id, { features: updatedFeatures });
  };

  return (
    <motion.div
      className={styles.pageContent}
      style={{ justifyContent: "unset" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className={styles.house_features_area}>
        <Section
          title="Thay đổi tiện nghi"
          options={defaultOptions}
          staycation={staycation}
          onToggle={toggleFeature}
        />
        <Section
          options={premiumOptions}
          staycation={staycation}
          onToggle={toggleFeature}
        />
        <Section
          options={safetyOptions}
          staycation={staycation}
          onToggle={toggleFeature}
        />
      </div>
    </motion.div>
  );
}

function Section({ title, options, staycation, onToggle }) {
  return (
    <>
      <h2 style={{ fontSize: "1.68rem" }}>{title}</h2>
      <div className={styles.house_featues}>
        <List options={options} staycation={staycation} onToggle={onToggle} />
      </div>
    </>
  );
}

function List({ options, staycation, onToggle }) {
  return (
    <>
      {options.map((opt) => {
        const isSelected = staycation.features.includes(opt.name);

        return (
          <motion.div
            key={opt.name}
            className={`${styles.house_type_option} ${isSelected ? styles.selected : ""}`}
            style={{ boxShadow: isSelected ? "rgb(34, 34, 34) 0px 0px 0px 2px"  : "none",  minWidth: "86px", display: "flex", flexDirection: "column"}}
            onClick={() => onToggle(opt.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span> {opt.icon} </span>
            <span>{opt.name}</span>
          </motion.div>
        );
      })}
    </>
  );
}
