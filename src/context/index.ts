import { proxy, useSnapshot } from 'valtio'

import type { _presetType } from './preset'
import { _preset } from './preset'
import { INode, TSelectedNode } from '@/types'

export const state = proxy<_presetType>(_preset)

export const useStore = () => useSnapshot(state)

export const setCompanyId = (payload: string) => {
    state.companyId = payload
}

export const setSensor = (payload: string) => {
    state.sensor = payload
}

export const setStatus = (payload: string) => {
    state.status = payload
}

export const setInputSearch = (payload: string) => {
    state.inputSearch = payload
}

export const setSelectedItem = (payload: TSelectedNode | INode) => {
    state.selectedItem = payload
}


