
import { camelQry } from 'trans-render/lib/types';
import {DeriveRule} from './types';

export async function derive(deriveRules: DeriveRule[], realmToSurvey: Element, derivedVals: any){
    for(const deriveRule of deriveRules){
        const {queryInfo} = deriveRule;
        const {query, attrib} = queryInfo;
        const srcElement = realmToSurvey.querySelector(query);
        let val: any = undefined;
        if(attrib !== undefined){
            val = srcElement!.getAttribute(attrib);
        }else{
            if(srcElement instanceof HTMLAnchorElement){
                val = srcElement.href;
            }else if(srcElement instanceof HTMLInputElement){
                val = srcElement.value;
            }else{
                val = srcElement!.textContent;
            }
        }
        const {as, derive} = deriveRule;
        switch(as){
            case 'number':
                val = Number(val);
                break;
            case 'date':
                val = new Date(val!);
                break;
        }
        derivedVals[derive]  = val;
    }
}

export async function toCanonical(Derive: string[]): Promise<DeriveRule[]>{
    const {tryParse} = await import('be-enhanced/cpu.js');
    const returnObj: DeriveRule[] = [];
    for(const deriveStatement of Derive){
        const parsed = tryParse(deriveStatement, reDeriveMediumKey) as ParsedDeriveMediumKey;
        if(parsed !== null){
            const {camelQry, propName, propType} = parsed;
            const {getQuery} = await import('trans-render/lib/specialKeys.js');
            const queryInfo = getQuery(camelQry);
            const deriveRule: DeriveRule = {
                derive: propName,
                as: propType,
                from: camelQry,
                queryInfo
            };
            returnObj.push(deriveRule);
        }
    }
    return returnObj;
}
interface ParsedDeriveMediumKey{
    propName: string,
    propType: 'number' | 'date' | 'boolean',
    camelQry: camelQry,
}
const reDeriveMediumKey = /^(?<propName>[\w\\]+)As(?<propType>(?<!\\)Number|(?<!\\)Date)(?<!\\)From(?<camelQry>[\w\\]+)/;