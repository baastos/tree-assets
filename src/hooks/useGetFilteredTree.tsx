import { ILocation, TAssets } from "@/types";
import { recursiveFilter, buildTree } from "@/utils";
import { useMemo } from "react";

interface IuseGetFilteredTree {
  locations: ILocation[] | undefined;
  assets: TAssets | undefined;
  inputSearch: string;
  sensor: string;
  status: string;
}
function useGetFilteredTree({
  locations,
  assets,
  inputSearch,
  sensor,
  status,
}: IuseGetFilteredTree) {
  const hasFilters = Boolean(inputSearch || sensor || status);

  const tree = useMemo(() => {
    if (locations?.length && assets?.length) {
      return buildTree(locations, assets);
    }
    return {};
  }, [locations, assets]);

  const filteredTree = useMemo(() => {
    if (!hasFilters) return tree;

    return Object.values(tree)
      .map((node) => recursiveFilter(node, inputSearch, sensor, status))
      .filter(Boolean);
  }, [inputSearch, sensor, status, tree, hasFilters]);

  return filteredTree;
}

export default useGetFilteredTree;
