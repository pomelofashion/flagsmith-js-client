
type IFlagsmithValue<T=string | number | boolean | null> = T
export interface IFlagsmithFeature {
    id?: number;
    enabled: boolean;
    value?: IFlagsmithValue;
}

export declare type IFlagsmithTrait = IFlagsmithValue;
export declare type IFlags<F extends string = string> = Record<F, IFlagsmithFeature>;
export declare type ITraits<T extends string = string> = Record<T, IFlagsmithTrait>;

export declare type GetValueOptions<T = Array<any> | object> =  {
    json?: boolean;
    fallback?: T
}


export interface IRetrieveInfo {
    isFromServer: boolean;
    flagsChanged: boolean;
    traitsChanged: boolean;
}
export interface IState<F extends string = string, T extends string = string> {
    api: string;
    environmentID: string;
    flags?: IFlags<F>;
    evaluationEvent?: Record<string, Record<string, number>> | null;
    identity?: string;
    traits: ITraits<T>;
}
declare type ICacheOptions = {
    ttl?: number;
    skipAPI?: boolean;
};
export interface IInitConfig<F extends string = string, T extends string = string> {
    AsyncStorage?: any;
    api?: string;
    apiProxy? : string;
    cacheFlags?: boolean;
    cacheOptions?: ICacheOptions;
    defaultFlags?: IFlags<F>;
    fetch?: any;
    realtime?: boolean;
    eventSourceUrl?: string;
    enableAnalytics?: boolean;
    enableDynatrace?: boolean;
    enableLogs?: boolean;
    angularHttpClient?: any;
    environmentID: string;
    headers?: object;
    identity?: string;
    getFlagWithProxy?: boolean;
    traits?: ITraits<T>;
    onChange?: (previousFlags: IFlags<F> | null, params: IRetrieveInfo) => void;
    onError?: (err: Error) => void;
    preventFetch?: boolean;
    state?: IState;
    _trigger?: () => void;
}
export interface IFlagsmithResponse {
    traits?: {
        trait_key: string;
        trait_value: IFlagsmithValue;
    }[];
    flags?: {
        enabled: boolean;
        feature_state_value: IFlagsmithValue;
        feature: {
            id: number;
            name: string;
        };
    }[];
}
export interface IFlagsmith<F extends string = string, T extends string = string> {
    /**
     * Initialise the sdk against a particular environment
     */
    init: (config: IInitConfig<F, T>) => Promise<void>;
    /**
     * Trigger a manual fetch of the environment features
     */
    getFlags: () => Promise<void>;
    /**
     * Returns the current flags
     */
    getAllFlags: () => IFlags<F>;
    /**
     * Identify user, triggers a call to get flags if flagsmith.init has been called
     */
    identify: (userId: string, traits?: Record<string, IFlagsmithValue>) => Promise<void>;
    /**
     * Retrieves the current state of flagsmith
     */
    getState: () => IState;
    /**
     * Set the current state of flagsmith
     */
    setState: (state: IState) => void;
    /**
     * Clears the identity, triggers a call to getFlags
     */
    logout: () => Promise<void>;
    /**
     * Polls the flagsmith API, specify interval in ms
     */
    startListening: (interval?: number) => void;
    /**
     * Stops polling
     */
    stopListening: () => void;
    /**
     * Get the whether a flag is enabled e.g. flagsmith.hasFeature("powerUserFeature")
     */
    hasFeature: (key: F) => boolean;
    /**
     * Get the value of a particular remote config e.g. flagsmith.getValue("font_size")
     */
    getValue<T=IFlagsmithValue>(key: F, options?: GetValueOptions<T>): IFlagsmithValue<T>;
    /**
     * Get the value of a particular trait for the identified user
     */
    getTrait: (key: T) => IFlagsmithValue;
    /**
     * Get the values of all traits for the identified user
     */
    getAllTraits: () => Record<string, IFlagsmithValue>;
    /**
     * Set a specific trait for a given user id, triggers a call to get flags
     */
    setTrait: (key: T, value: IFlagsmithValue) => Promise<void>;
    /**
     * Set a key value set of traits for a given user, triggers a call to get flags
     */
    setTraits: (traits: Record<T, IFlagsmithValue>) => Promise<void>;
    /**
     * The stored identity of the user
     */
    identity?: string;
    /**
     * Whether the flagsmith SDK is initialised
     */
    initialised?: boolean;
    /**
     * Used internally, this function will callback separately to onChange whenever flags are updated
     */
    trigger?: () => {};
    /**
     * Used internally, this function will console log if enableLogs is being set within flagsmith.init
     */
    log: (message?: any, ...optionalParams: any[]) =>void;
    /**
     * Used internally, this is the cache options provided in flagsmith.init
     */
    cacheOptions: {
        ttl: number;
        skipAPI: boolean;
    };
}
export {};
