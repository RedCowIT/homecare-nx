import {EntityCacheItem} from "./entity-cache-item";

export interface EntityCacheBlock {
  version: string;
  cachedAt: string;
  payloadId?: string;
  items: EntityCacheItem[];
}
