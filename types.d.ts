import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {QueryInfo, Scope, camelQry, JSONObject} from 'trans-render/lib/types';

export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLTemplateElement | HTMLScriptElement>{
    canonicalConfig?: CanonicalConfig;
}

export type propName = string;

export type propType = 'number' | 'string' | 'date' | 'boolean';

export type DeriveStatement = `${propName}As${propType}From${camelQry}`;

export type EmptyString = '';

export interface CamelConfig{
    Affect?: [Scope];
    affect?: Scope;
    Survey?: [Scope];
    survey?: Scope;
    Target?: [string];
    target?: string;
    Derive?: DeriveStatement[];
    Itemize?: EmptyString[];
    itemize?: boolean;
}


export interface DeriveRule {
    derive: propName,
    as: propType,
    from: camelQry,
    queryInfo: QueryInfo,
}

export interface CanonicalConfig{
    affect: Scope;
    survey: Scope;
    target?: string;
    xsltProcessor?: XSLTProcessor;
    itemize: boolean;
    deriveRules?: DeriveRule[];
}

export type Proxy = (HTMLTemplateElement | HTMLScriptElement) & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy
}

export type PPP = Partial<PP>;

export type PPPP = Promise<PPP>;

export interface Actions{
    camelToCanonical(pp: PP, mold: PPP): PPPP;
    onCanonical(pp: PP, mold: PPP): PPPP;
}