"use client";
import { setSensor, setStatus, useStore } from "@/context";
import { BoltOutlinedSvg, InfoSvg } from "../Icons";

export function TreeFilters() {
  const { sensor, status } = useStore();

  const buttonStyle = {
    cursor: "pointer",
    border: "1px solid var(--divider)",
    padding: "6px 8px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "filter 0.3s ease",
    fontWeight: "bold",
  };

  return (
    <div
      id="tree-filters"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <h2>Ativos</h2>
        <p
          style={{
            color: "var(--text-disabled)",
          }}
        >
          / Apex
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <div
          onClick={() => {
            if (sensor === "energy") {
              setSensor("");
              return;
            }
            setSensor("energy");
          }}
          className="button"
          style={{
            backgroundColor:
              sensor === "energy" ? "var(--blue)" : "transparent",
            ...buttonStyle,
          }}
        >
          <BoltOutlinedSvg
            color={sensor === "energy" ? "var(--white)" : "var(--blue)"}
          />
          <span
            style={{
              color:
                sensor === "energy" ? "var(--white)" : "var(--text-disabled)",
              fontSize: "14px",
            }}
          >
            Sensor de energia
          </span>
        </div>
        <div
          onClick={() => {
            if (status === "alert") {
              setStatus("");
              return;
            }
            setStatus("alert");
          }}
          className="button"
          style={{
            backgroundColor: status === "alert" ? "var(--blue)" : "transparent",
            ...buttonStyle,
          }}
        >
          <InfoSvg
            color={status === "alert" ? "var(--white)" : "var(--blue)"}
          />

          <span
            style={{
              color:
                status === "alert" ? "var(--white)" : "var(--text-disabled)",
              fontSize: "14px",
            }}
          >
            Crítico
          </span>
        </div>
      </div>
    </div>
  );
}
