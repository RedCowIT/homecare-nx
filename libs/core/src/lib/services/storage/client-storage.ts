export interface ClientStorage {
    /**
     * Get the value associated with the given key.
     * @param key the key to identify this value
     * @return Promise that resolves with the value
     */
    get(key: string): Promise<any>;
    /**
     * Set the value for the given key.
     * @param key the key to identify this value
     * @param value the value for this key
     * @return Promise that resolves when the value is set
     */
    set(key: string, value: any): Promise<any>;
    /**
     * Remove any value associated with this key.
     * @param key the key to identify this value
     * @return Promise that resolves when the value is removed
     */
    remove(key: string): Promise<any>;
    /**
     * Clear the entire key value store. WARNING: HOT!
     * @return Promise that resolves when the store is cleared
     */
    clear(): Promise<void>;
    /**
     * @return Promise that resolves with the number of keys stored.
     */
    length(): Promise<number>;
    /**
     * @return Promise that resolves with the keys in the store.
     */
    keys(): Promise<string[]>;
}
