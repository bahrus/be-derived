import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeDerived extends EventTarget {
    async camelToCanonical(pp, mold) {
        const { camelConfig, self } = pp;
        let { affect, target, survey, Derive, itemize } = camelConfig;
        affect = affect || 'previousElementSibling';
        survey = survey || affect;
        const canonicalConfig = {
            affect,
            itemize: !!itemize,
            survey,
            target,
        };
        if (Derive !== undefined) {
            const { toCanonical } = await import('./derive.js');
            canonicalConfig.deriveRules = await toCanonical(Derive); //await derive(Derive, realmToSurvey, derivedVals);
        }
        if (self instanceof HTMLTemplateElement) {
            const { toCanonical } = await import('./xslt.js');
            canonicalConfig.xsltProcessor = toCanonical(self);
        }
        return { canonicalConfig };
    }
    async onCanonical(pp, mold) {
        const { self, canonicalConfig } = pp;
        const { survey, affect, itemize, target, deriveRules, xsltProcessor } = canonicalConfig;
        const { findRealm } = await import('trans-render/lib/findRealm.js');
        const realmToSurvey = await findRealm(self, survey);
        if (!(realmToSurvey instanceof Element))
            throw 'bD.404';
        let affected = await findRealm(self, affect);
        let split;
        if (target !== undefined) {
            const { beSplit } = await import('be-decorated/cpu.js');
            split = await beSplit(target);
        }
        const derivedVals = {};
        if (itemize) {
            const { itemize: doItemize } = await import('./itemize.js');
            doItemize(realmToSurvey, derivedVals);
        }
        if (deriveRules !== undefined) {
            const { derive } = await import('./derive.js');
            derive(deriveRules, realmToSurvey, derivedVals);
        }
        if (self instanceof HTMLTemplateElement) {
            if (xsltProcessor !== undefined) {
                const { xslt } = await import('./xslt.js');
                xslt(xsltProcessor, realmToSurvey, derivedVals);
            }
        }
        else if (self instanceof HTMLScriptElement && self.noModule) {
            const { script } = await import('./script.js');
            await script(self, realmToSurvey, derivedVals);
        }
        if (split !== undefined) {
            const { setProp } = await import('trans-render/lib/setProp.js');
            await setProp(affected, split.path, derivedVals);
        }
        else {
            Object.assign(affected, derivedVals);
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
const upgrade = 'template,script';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: ['template', 'script'],
            virtualProps: ['camelConfig', 'canonicalConfig'],
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
                ifNoneOf: ['canonicalConfig']
            },
            onCanonical: {
                ifAllOf: ['canonicalConfig'],
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
