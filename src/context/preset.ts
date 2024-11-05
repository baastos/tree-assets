import { TSelectedNode } from '@/types'
import type { IStore } from './types'

export type _presetType = IStore

export const initialSelectedItemState: TSelectedNode  = {
    gatewayId: "N/A",
    id: "",
    locationId: null,
    name: "",
    parentId: null,
    sensorId: "N/A",
    sensorType: "N/A",
    status: "N/A",
    type: "",
    nodes: [],
    isOpen: false,
}

export const _preset: IStore = {
    companyId: '',
    sensor:'',
    status:'',
    inputSearch:'',
    selectedItem: initialSelectedItemState 
}
