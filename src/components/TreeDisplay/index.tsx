"use client";
import { useStore } from "@/context";
import { SensorIcon } from "../SensorIcon";
import Image from "next/image";
import SensorSvg from "@/assets/sensor.svg";
import ReceptorSvg from "@/assets/receptor.svg";
import { ImageDisplay } from "../DisplayImage";

interface IHashKey {
  [key: string]: string;
}

export function TreeDisplay() {
  const { selectedItem } = useStore();

  const sensorToDisplay: IHashKey = {
    energy: "Motor Elétrico (Trifásico)",
    vibration: "Sensor de Vibração Motorizada",
    "N/A": "N/A",
  };

  const responsiblesToDisplay: IHashKey = {
    energy: "E",
    vibration: "M",
    "N/A": "",
  };

  const typeToDisplay: IHashKey = {
    energy: "Elétrica",
    vibration: "Mecânica",
    "N/A": "N/A",
  };

  return (
    <section
      id="tree-display-section"
      style={{
        width: "100%",
        border: "1px solid var(--disabled)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "16px",
          borderBottom: "1px solid var(--disabled)",
          minHeight: "70px",
        }}
      >
        <h1>{selectedItem?.name}</h1>
        {selectedItem?.status && selectedItem?.status !== "N/A" && (
          <SensorIcon
            type={selectedItem?.sensorType}
            color={
              selectedItem?.status === "operating"
                ? "var(--green)"
                : "var(--red)"
            }
          />
        )}
      </header>
      <div
        style={{
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <ImageDisplay type={selectedItem?.sensorType} />
          <div
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3>Tipo de equipamento</h3>
              <span
                style={{
                  color: "var(--text-disabled)",
                }}
              >
                {sensorToDisplay[selectedItem?.sensorType]}
              </span>
            </div>

            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "var(--divider)",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3>Responsáveis</h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    background: "var(--blue)",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    color: "var(--white)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {responsiblesToDisplay[selectedItem?.sensorType]}
                </div>
                <span
                  style={{
                    color: "var(--text-disabled)",
                  }}
                >
                  {typeToDisplay[selectedItem?.sensorType]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            width: "100%",
            backgroundColor: "var(--divider)",
            marginTop: "24px",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h3>Sensor</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image width={20} src={SensorSvg} alt="Sensor Logo" />
              <span
                style={{
                  color: "var(--text-disabled)",
                }}
              >
                {selectedItem?.sensorId}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h3>Receptor</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Image width={20} src={ReceptorSvg} alt="Receptor Logo" />

              <span
                style={{
                  color: "var(--text-disabled)",
                }}
              >
                {selectedItem?.gatewayId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
