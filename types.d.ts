import {ActionOnEventConfigs} from 'trans-render/froop/types';
import {IBE} from 'be-enhanced/types';
import {QueryInfo, Scope, camelQry, JSONObject, MatchRHS, } from 'trans-render/lib/types';


export interface EndUserProps extends IBE<HTMLTemplateElement | HTMLScriptElement>{
    camelConfig?: CamelConfig;
}

export interface AllProps extends EndUserProps{
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

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export type ProPOA = Promise<POA>


export interface Actions{
    camelToCanonical(self: this): ProPAP;
    onCanonical(self: this): ProPAP;
}