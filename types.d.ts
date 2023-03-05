import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {QueryInfo, Scope, camelQry, JSONObject} from 'trans-render/lib/types';

export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLTemplateElement>{
    //canonicalConfig?: CanonicalConfig;
}

export interface CamelConfig{
    Affect?: [Scope];
    affect?: Scope;
    Survey?: [Scope];
    survey?: Scope;
    Target?: [string];
    target?: string;
}

// export interface CanonicalConfig{
//     targetPath?: string;
//     survey: Scope;
//     affect: Scope;
// }

export type Proxy = HTMLTemplateElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy
}

export type PPP = Partial<PP>;

export interface Actions{
    camelToCanonical(pp: PP, mold: PPP): Promise<PPP>;
    //onCanonical(pp: PP, mold: PPP): Promise<PPP>;
}