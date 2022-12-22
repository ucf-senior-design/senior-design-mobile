import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({})

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>
/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
