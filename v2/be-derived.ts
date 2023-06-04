import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig, BeSplitOutput, EnhancementInfo} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, ProPOA, POA} from './types';
import {register} from 'be-hive/register.js';
import { JSONObject } from 'trans-render/lib/types';

export class BeDerived extends BE<AP, Actions> implements Actions{
    static override get beConfig(): BEConfig<any> {
        return {
            parse: true,
        }
    }

    override async attach(enhancedElement: Element, enhancementInfo: EnhancementInfo): Promise<void> {
        super.attach(enhancedElement, enhancementInfo);
        if(!enhancedElement.hasAttribute('itemscope')) throw {enhancedElement, msg: 'itemscope missing.'};
        const derivedObject: JSONObject = {};
        const {childrenParsed} = await import('be-a-beacon/childrenParsed.js');
        await childrenParsed(enhancedElement);
        let itempropElements = Array.from(enhancedElement.querySelectorAll('[itemprop]'));
        itempropElements = itempropElements.filter(x => x.closest('[itemscope]') === enhancedElement);
        const {getItemPropVal} = await import('be-linked/getItemPropVal.js'); //TODO:  rename
        for(const itempropElement of itempropElements){
            derivedObject[itempropElement.getAttribute('itemprop')!] = await getItemPropVal(itempropElement);
        }
        this.derivedObject = derivedObject;
        this.resolved = true;
    }

    logToConsole(self: this): void {
        const {derivedObject} = self;
        console.log({derivedObject});
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
            log: false,
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