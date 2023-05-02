import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeDerived extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'camelConfig',
            primaryPropReq: true,
            parseAndCamelize: true,
            camelizeOptions: {
                doSets: true,
                simpleSets: ['Affect', 'Survey', 'Target']
            }
        };
    }
    async camelToCanonical(self) {
        const { camelConfig, enhancedElement } = self;
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
        if (enhancedElement instanceof HTMLTemplateElement) {
            const { toCanonical } = await import('./xslt.js');
            canonicalConfig.xsltProcessor = toCanonical(enhancedElement);
        }
        return { canonicalConfig };
    }
    async onCanonical(self) {
        const { enhancedElement, canonicalConfig } = self;
        const { survey, affect, itemize, target, deriveRules, xsltProcessor } = canonicalConfig;
        const { findRealm } = await import('trans-render/lib/findRealm.js');
        const realmToSurvey = await findRealm(enhancedElement, survey);
        if (!(realmToSurvey instanceof Element))
            throw 'bD.404';
        let affected = await findRealm(enhancedElement, affect);
        let split;
        if (target !== undefined) {
            const { beSplit } = await import('be-enhanced/cpu.js');
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
        if (enhancedElement instanceof HTMLTemplateElement) {
            if (xsltProcessor !== undefined) {
                const { xslt } = await import('./xslt.js');
                xslt(xsltProcessor, realmToSurvey, derivedVals);
            }
        }
        else if (enhancedElement instanceof HTMLScriptElement && enhancedElement.noModule) {
            const { script } = await import('./script.js');
            await script(enhancedElement, realmToSurvey, derivedVals);
        }
        if (split !== undefined) {
            const { setProp } = await import('trans-render/lib/setProp.js');
            await setProp(affected, split.path, derivedVals);
        }
        else {
            Object.assign(affected, derivedVals);
        }
        return {
            resolved: true
        };
    }
}
const tagName = 'be-derived';
const ifWantsToBe = 'derived';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            camelToCanonical: {
                ifAllOf: ['camelConfig'],
                ifNoneOf: ['canonicalConfig']
            },
            onCanonical: {
                ifAllOf: ['canonicalConfig']
            }
        }
    },
    superclass: BeDerived
});
register(ifWantsToBe, upgrade, tagName);
