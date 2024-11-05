"use client";
import { setSelectedItem, useStore } from "@/context";
import { getAssets, getLocations } from "@/services";
import { useQuery } from "@tanstack/react-query";
import useGetFilteredTree from "@/hooks/useGetFilteredTree";
import { useState } from "react";
import Image from "next/image";
import Arrow from "@/assets/down-arrow.svg";

import { SensorIcon } from "../SensorIcon";
import { renderIconType } from "../Icons";
import { ILocation, INode, TAssets, TSelectedNode } from "@/types";

export function Tree() {
  const { companyId, inputSearch, sensor, status } = useStore();

  const { data: locations } = useQuery<ILocation[]>({
    queryKey: ["locations", { companyId }],
    queryFn: () => getLocations(companyId),
    enabled: !!companyId,
  });
  const { data: assets } = useQuery<TAssets>({
    queryKey: ["assets", { companyId }],
    queryFn: () => getAssets(companyId),
    enabled: !!companyId,
  });

  const tree = useGetFilteredTree({
    locations,
    assets,
    inputSearch,
    sensor,
    status,
  });
  const TreeView = ({ tree }: { tree: INode[] }) => {
    return (
      <div>
        {tree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    );
  };

  const TreeNode = ({ node }: { node: TSelectedNode | INode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(node.isOpen);
    const { selectedItem } = useStore();
    const isItemSelected = selectedItem.id && selectedItem.id === node.id;

    const isNodeSelectable = !node.nodes.length && node.type !== "location";

    const toggle = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div
        style={{
          margin: "10px 0",
          paddingLeft: "20px",
        }}
      >
        <div
          onClick={() => {
            if (isNodeSelectable) {
              setSelectedItem(node);
              return;
            }
            toggle();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: isItemSelected
              ? "2px solid var(--blue)"
              : "2px solid transparent",
            cursor:
              node.nodes.length > 0 || isNodeSelectable ? "pointer" : "normal",
          }}
        >
          {node.nodes.length > 0 && (
            <button className="button" type="button" onClick={toggle}>
              <Image
                alt="Arrow icon"
                src={Arrow}
                width={12}
                priority
                loading="eager"
                style={{
                  ...(!isOpen && { transform: "rotate(-90deg)" }),
                  cursor: "pointer",
                }}
              />
            </button>
          )}
          {renderIconType[node.type]}
          <span>{node.name}</span>
          {(node.sensorType || node.status) && (
            <SensorIcon
              type={node.sensorType}
              color={
                node.status === "operating" ? "var(--green)" : "var(--red)"
              }
            />
          )}
        </div>
        {isOpen && <TreeView tree={node.nodes} />}
      </div>
    );
  };
  return (
    <div
      id="tree-view"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 200px)",
      }}
    >
      <TreeView tree={Object.values(tree as INode[])} />
    </div>
  );
}
