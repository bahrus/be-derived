import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {QueryInfo, Scope, camelQry, JSONObject} from 'trans-render/lib/types';

export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export interface CamelConfig{
    Affect?: [Scope];
    affect?: Scope;
    Survey?: [Scope];
    survey?: Scope;
    Target?: [string];
    target?: string;
}

export interface CanonicalConfig{
    targetPath?: string;
    survey: Scope;
    affect: Scope;
}