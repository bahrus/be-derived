import {ActionOnEventConfigs} from 'trans-render/froop/types';
import {IBE} from 'be-enhanced/types';
import {JSONObject} from 'trans-render/lib/types';

export interface EndUserProps extends IBE{
    log?:  boolean;
}

export interface AllProps extends EndUserProps{
    derivedObject: JSONObject;
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export type ProPOA = Promise<POA>;

export interface Actions{
    logToConsole(self: this): void;
}