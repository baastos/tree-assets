import { ILocation, TAssets } from "@/types";
import { buildTree } from "@/utils";
import { useMemo } from "react";

interface IuseGetFilteredTree {
  locations: ILocation[] | undefined;
  assets: TAssets | undefined;
}
function useBuildTree({ locations, assets }: IuseGetFilteredTree) {
  const tree = useMemo(() => {
    if (locations?.length && assets?.length) {
      return buildTree(locations, assets);
    }
    return {};
  }, [locations, assets]);
  return tree;
}

export default useBuildTree;
