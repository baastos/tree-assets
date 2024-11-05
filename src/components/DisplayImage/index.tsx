import Image from "next/image";
import ValveImage from "@/assets/valve.svg";
import MotorImg from "@/assets/motor.svg";
import BoxSvg from "@/assets/empty-box.svg";
import { CSSProperties } from "react";

interface ImageItem {
  src: string;
  alt: string;
  defaultStyle?: CSSProperties;
}

type ImageMapKey = "default" | "energy" | "vibration" | string;

export function ImageDisplay({ type }: { type: ImageMapKey }) {
  const imageStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "322px",
    height: "226px",
    backgroundColor: "var(--light-blue)",
    border: "2px dashed var(--blue)",
    cursor: "pointer",
    flex: "0 0 auto",
    gap: "8px",
    color: "var(--blue)",
  };

  const imageMap: Record<ImageMapKey, ImageItem> = {
    default: { src: BoxSvg, alt: "Box Logo", defaultStyle: imageStyles },
    energy: { src: ValveImage, alt: "Display image" },
    vibration: { src: MotorImg, alt: "Motor image" },
  };
  const { src, alt, defaultStyle } = imageMap[type] || imageMap.default;

  return (
    <div style={defaultStyle}>
      <Image
        src={src}
        alt={alt}
        width={defaultStyle ? 30 : 336}
        height={defaultStyle ? undefined : 226}
        priority
        loading="eager"
      />
      {defaultStyle && (
        <span style={{ color: imageStyles.color }}>
          Adicionar imagem do ativo
        </span>
      )}
    </div>
  );
}
