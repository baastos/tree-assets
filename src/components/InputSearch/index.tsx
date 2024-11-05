"use client";
import Image from "next/image";
import SearchIcon from "@/assets/search.svg";
import { debounce } from "@/utils";
import { setInputSearch } from "@/context";

export function InputSearch() {
  const handleInputSearch = debounce((value: string) => {
    setInputSearch(value.toLocaleLowerCase());
  }, 500);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #e2e2e2",
        padding: "8px 0px",
      }}
    >
      <input
        onChange={(e) => handleInputSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
        }}
        placeholder="Buscar ativo ou local"
        type="text"
      />
      <Image
        style={{
          marginRight: "16px",
        }}
        alt="Search logo"
        src={SearchIcon}
        priority
        loading="eager"
        width={18}
        height={18}
      />
    </div>
  );
}
