import { create } from 'zustand'
import { StateSlice, createStateSlice } from './slices/state'
import { DataSlice , createDataSlice } from './slices/data'
import { ActionsSlice, createActionsSlice } from './slices/actions'

export type ClientStore = StateSlice & DataSlice & ActionsSlice

export const useClientStore = create<ClientStore>()((...a) => ({
  ...createStateSlice(...a),
  ...createDataSlice(...a),
  ...createActionsSlice(...a),
}))
