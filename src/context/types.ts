import { INode, TSelectedNode } from "@/types"

export interface IStore {
    companyId:string
    sensor:string
    status:string
    inputSearch:string
    selectedItem: TSelectedNode | INode
}




