import React, { CSSProperties } from "react";
import styles from "./Postit.module.css";

interface PostitProps {
  name: string;
  text: string;
  rotation: string;
  color: string;
  x: string;
  y: string;
  z: number;
}

// Extend CSSProperties to allow custom properties
interface CustomCSSProperties extends CSSProperties {
  "--rotation"?: string;
  "--color"?: string;
  "--x"?: string;
  "--y"?: string;
  "--z-index"?: number;
}

const Postit: React.FC<PostitProps> = ({
  name,
  text,
  rotation,
  color,
  x,
  y,
  z,
}) => {
  const customStyle: CustomCSSProperties = {
    "--rotation": `${rotation}deg`,
    "--color": color,
    "--x": `${x}px`,
    "--y": `${y}px`,
    "--z-index": z,
  };

  return (
    <div className={styles.postitWrap} style={customStyle as CSSProperties}>
      <div className={styles.postit} style={customStyle as CSSProperties}>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Postit;
