export declare function useKeepAliveCache(): {
    getCaches(): string[];
    addCache(name: string): void;
    removeCache(name: string): Promise<boolean>;
    removeAllCaches(): Promise<void>;
};
