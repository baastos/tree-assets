"use client";
import { setSelectedItem, useStore } from "@/context";
import { getAssets, getLocations } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { memo, useCallback, useState } from "react";

import { SensorIcon } from "../SensorIcon";
import { ArrowIcon, renderIconType } from "../Icons";
import { ILocation, INode, TAssets, TSelectedNode } from "@/types";
import { recursiveFilter } from "@/utils";
import useBuildTree from "@/hooks/useBuildTree";

export function Tree() {
  const { companyId } = useStore();

  const { data: locations, isLoading: isLocationsLoading } = useQuery<
    ILocation[]
  >({
    queryKey: ["locations", { companyId }],
    queryFn: () => getLocations(companyId),
    enabled: !!companyId,
  });
  const { data: assets, isLoading: isAssetsLoading } = useQuery<TAssets>({
    queryKey: ["assets", { companyId }],
    queryFn: () => getAssets(companyId),
    enabled: !!companyId,
  });

  const tree = useBuildTree({
    locations,
    assets,
  });

  const TreeView = memo(({ tree }: { tree: INode[] }) => {
    const { inputSearch, sensor, status } = useStore();

    const hasFilters = inputSearch || sensor || status;

    if (!hasFilters) {
      return tree.map((node) => <TreeNode key={node.id} node={node} />);
    }

    const filteredTree = tree
      .map((node) => recursiveFilter(node, inputSearch, sensor, status))
      .filter((child) => Boolean(child)) as INode[];

    return (
      <div>
        {filteredTree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    );
  });
  TreeView.displayName = "TreeViewDisplayName";

  const TreeNode = memo(({ node }: { node: TSelectedNode | INode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(node.isOpen);
    const { selectedItem } = useStore();
    const isItemSelected = selectedItem.id && selectedItem.id === node.id;

    const isNodeSelectable = !node.nodes.length && node.type !== "location";

    const toggle = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

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
            <button
              className="button"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
            >
              <ArrowIcon isOpen={isOpen} />
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
  });
  TreeNode.displayName = "TreeNodeDisplayName";
  return (
    <div
      id="tree-view"
      style={{
        overflowY: "auto",
        height: "calc(100vh - 200px)",
      }}
    >
      {isAssetsLoading || isLocationsLoading ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="loader" />
        </div>
      ) : (
        <TreeView tree={Object.values(tree) as INode[]} />
      )}
    </div>
  );
}
