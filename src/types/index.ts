export interface INode {
  gatewayId: string;
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorId: string;
  sensorType: 'energy' | 'vibration' | string
  status: 'operating' |  'alert' | string 
  type: 'component' | 'asset' | 'location'
  nodes: INode[]; 
  isOpen: boolean;
}

export interface ICompany {
  id: string;
  name: string;
}

export interface ILocation {
  id: string;
  name: string;
  parentId: string | null;
  locationId?:string
}

export interface ILocations{
  locations: ILocation[];
}

export interface IAsset {
  gatewayId?: string;
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorId?: string;
  sensorType:  string;
  status: string;
}


export interface INodeTree {
  gatewayId?: string;
  id: string;
  locationId?: string | null;
  name: string;
  parentId?: string | null;
  sensorId?: string | undefined;
  sensorType?: string | null
  status?: string 
  type: string
  nodes: (INodeTree | null)[]; 
  isOpen: boolean;
}

export interface IMapTree{
  [key:string]:INodeTree
}


export type TSelectedNode = Omit<INode, 'type' | 'sensorType'> & {
  type: 'component' | 'asset' | 'location' | string; 
  sensorType: 'energy' | 'vibration' | 'N/A' 
};

export type TAssets = IAsset[];

export type TCompanies = ICompany[];


