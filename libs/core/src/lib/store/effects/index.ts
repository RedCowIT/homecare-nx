import {EntityErrorEffects} from "./entity-error.effects";
import {DataErrorEffects} from "./data-error.effects";
import {DeviceEffects} from "./device.effects";

export const coreEffects = [
  EntityErrorEffects,
  DataErrorEffects,
  DeviceEffects
];
