import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig, BeSplitOutput, EnhancementInfo} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, ProPOA, POA} from './types';
import {register} from 'be-hive/register.js';
import { JSONObject } from 'trans-render/lib/types';

export class BeDerived extends BE<AP, Actions> implements Actions{
    static override get beConfig(): BEConfig<any> {
        return {
            parse: false,
        }
    }

    override async attach(enhancedElement: Element, enhancementInfo: EnhancementInfo): Promise<void> {
        super.attach(enhancedElement, enhancementInfo);
        if(!enhancedElement.hasAttribute('itemscope')) throw {enhancedElement, msg: 'itemscope missing.'};
        const derivedObject: JSONObject = {};
        const {childrenParsed} = await import('be-a-beacon/childrenParsed.js');
        await childrenParsed(enhancedElement);
        console.log('do the processing');
    }

    logToConsole(self: this): void {
        const {derivedObject} = self;

    }
}

export interface BeDerived extends AllProps{}

const tagName = 'be-derived';
const ifWantsToBe = 'derived';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo:{
            ...propInfo
        },
        actions:{
            logToConsole: {
                ifAllOf: ['resolved', 'log']
            }
        }
    },
    superclass: BeDerived
});

register(ifWantsToBe, upgrade, tagName);