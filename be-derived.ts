import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, CamelConfig} from './types';
import {camelQry, Scope} from 'trans-render/lib/types';
import { BeSplitOutput } from 'be-decorated/cpu.js';

export class BeDerived extends EventTarget implements Actions{
    async camelToCanonical(pp: PP, mold: PPP) {
        const {camelConfig, self} = pp;
        let {affect, target, survey, Derive, itemize} = camelConfig!;
        affect = affect || 'previousElementSibling';
        survey = survey || affect;
        const {findRealm} = await import('trans-render/lib/findRealm.js');
        const realmToSurvey = await findRealm(self, survey);
        if(!(realmToSurvey instanceof Element)) throw 'bD.404';
        let affected = await findRealm(self, affect);
        let split: BeSplitOutput | undefined;
        if(target !== undefined){
            const {beSplit} = await import('be-decorated/cpu.js');
            split = await beSplit(target);

        }
        const derivedVals = {} as any;
        if(Derive !== undefined){
            const {derive} = await import('./derive.js');
            await derive(Derive, realmToSurvey, derivedVals);
        }
        if(itemize){
            const {itemize: doItemize} = await import('./itemize.js');
            doItemize(realmToSurvey, derivedVals);
        }
        if(self instanceof HTMLTemplateElement){
            const {xslt} = await import('./xslt.js');
            await xslt(self, realmToSurvey, derivedVals);
        }else if(self instanceof HTMLScriptElement){
            const {script} = await import('./script.js');
            await script(self, realmToSurvey, derivedVals);
        }


        if(split !== undefined){
            const {setProp} = await import('trans-render/lib/setProp.js');
            await setProp(affected, split.path, derivedVals);

        }else{
            Object.assign(affected as any, derivedVals);
        }

        
        return mold;
    }


}
// interface ParsedDeriveMediumKey{
//     propName: string,
//     propType: 'number' | 'date',
//     camelQry: string,
// }
// const reDeriveMediumKey = /^(?<propName>[\w\\]+)As(?<propType>(?<!\\)Number|(?<!\\)Date)(?<!\\)From(?<camelQry>[\w\\]+)/;

const tagName = 'be-derived';
const ifWantsToBe = 'derived';
const upgrade = 'template';

define<Proxy & BeDecoratedProps<Proxy, Actions, CamelConfig>, Actions>({
    config:{
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: [upgrade],
            virtualProps: ['camelConfig'],
            primaryProp: 'camelConfig',
            primaryPropReq: true,
            parseAndCamelize: true,
            camelizeOptions: {
                doSets: true, 
                simpleSets: ['Affect', 'Survey', 'Target'],
                booleans: ['Itemize'],
            }
        },
        actions: {
            camelToCanonical: {
                ifAllOf: ['camelConfig'],
                returnObjMold: {
                    resolved: true,
                }
            }           
        }
    },
    complexPropDefaults: {
        controller: BeDerived,
    }
});

register(ifWantsToBe, upgrade, tagName);