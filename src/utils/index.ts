/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAsset, ILocation, IMapTree, INodeTree, TAssets } from "@/types";

export function debounce(func: (arg: string) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;

  return function (this: any, arg: string) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.call(this, arg), delay); 
  };
}

export function buildTree(locations:ILocation[],assets:TAssets) {
  if (!locations || !assets) return {};

  const map:IMapTree = {};
  const tree:IMapTree = {};

  locations.forEach((location) => {
    map[location.id] = {
      ...location,
      type: "location",
      nodes: [],
      isOpen: false,
    };
  });

  assets.forEach((asset) => {
    map[asset.id] = {
      ...asset,
      type: asset.sensorType ? "component" : "asset",
      nodes: [],
      isOpen: false,
    };
  });
  [...locations, ...assets].forEach((element:ILocation | IAsset) => {
    const parent = element.parentId || element.locationId;
    if (parent && map[parent]) {
      map[parent].nodes.push(map[element.id]);
    } else {
      tree[element.id] = map[element.id];
    }
  });

  return tree;
}

export const recursiveFilter = (node: INodeTree, inputSearch:string, sensor:string, status:string): INodeTree | null => {
  const nameMatches =
    inputSearch && node.name!.toLowerCase().includes(inputSearch.toLowerCase());
  const sensorMatches = sensor && node.sensorType === sensor;
  const statusMatches = status && node.status === status;
  const isMatch = nameMatches || sensorMatches || statusMatches;

  const filteredChildren:(INodeTree | null)[] =
    node.nodes
      ?.map((child) => recursiveFilter(child!, inputSearch, sensor, status))
      .filter(Boolean) || [];

  const hasMatchingChild = filteredChildren.length > 0;

  if (isMatch || hasMatchingChild) {
    return {
      ...node,
      nodes: filteredChildren,
      isOpen: isMatch || hasMatchingChild,
    };
  }
  return null;
};
