export interface EntityCacheItem {
  payloadId: string;
  data: Array<{entityName: string, entities: unknown[]}>;
}
