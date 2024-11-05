"use client";
import Image from "next/image";
import TreeLogo from "@/assets/tree.svg";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/services";
import { setCompanyId, setSelectedItem, useStore } from "@/context";
import { useEffect } from "react";
import { TCompanies } from "@/types";
import { initialSelectedItemState } from "@/context/preset";

export function Companies() {
  const { companyId } = useStore();

  const { data: companies, isLoading } = useQuery<TCompanies>({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  useEffect(() => {
    if (companies?.length) {
      setCompanyId(companies[0].id);
    }
  }, [companies]);

  useEffect(() => {
    setSelectedItem(initialSelectedItemState);
  }, [companyId]);

  if (isLoading) {
    return <div className="loader-companies" />;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {companies?.map((item) => (
        <button
          className={"button"}
          onClick={() => {
            if (item.id === companyId) {
              setCompanyId("");
              return;
            }
            setCompanyId(item.id);
          }}
          key={item.id}
          style={{
            color: "var(--white)",
            backgroundColor:
              companyId === item.id ? "var(--blue)" : "var(--blue-dark)",
            padding: "6px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: "80px",
            cursor: "pointer",
            transition: "filter 0.3s ease",
            borderRadius: "5px",
          }}
        >
          <Image
            alt="Tree logo"
            src={TreeLogo}
            priority
            loading="eager"
            width={14}
            height={14}
          />
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}
