import { IEnvironment } from '@homecare-nx/xplat/core';
import { deepMerge } from '@homecare-nx/xplat/utils';
import { environmentBase } from './environment.base';

export const environmentProd = deepMerge(environmentBase, <IEnvironment>{
  production: true,
  // customizations here...
});
