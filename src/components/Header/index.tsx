import Image from "next/image";
import TractianLogo from "@/assets/tractian.svg";
import { Companies } from "../Companies";
export function Header() {
  return (
    <header
      id="main-header"
      style={{
        backgroundColor: "var(--components)",
        display: "flex",
        padding: "16px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        alt="Tractian logo"
        src={TractianLogo}
        priority
        loading="eager"
        width={100}
        height={20}
      />
      <Companies />
    </header>
  );
}
