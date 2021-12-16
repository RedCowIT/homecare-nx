import {EntityErrorEffects} from "./entity-error.effects";
import {DataErrorEffects} from "./data-error.effects";
import {DeviceEffects} from "./device.effects";
import {StoreLogEffects} from "./store-log.effects";

export const coreEffects = [
  EntityErrorEffects,
  DataErrorEffects,
  DeviceEffects,
  StoreLogEffects
];
