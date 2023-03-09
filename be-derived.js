import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeDerived extends EventTarget {
    async camelToCanonical(pp, mold) {
        const { camelConfig, self } = pp;
        let { affect, target, survey, Derive } = camelConfig;
        affect = affect || 'previousElementSibling';
        survey = survey || affect;
        const { findRealm } = await import('trans-render/lib/findRealm.js');
        const realmToTransform = await findRealm(self, affect);
        let affected = await findRealm(self, affect);
        let split;
        if (target !== undefined) {
            const { beSplit } = await import('be-decorated/cpu.js');
            split = await beSplit(target);
        }
        console.log({ Derive });
        const derivedVals = {};
        if (Derive !== undefined) {
            const { tryParse } = await import('be-decorated/cpu.js');
            const realmToSurvey = await findRealm(self, survey);
            if (!(realmToSurvey instanceof Element))
                throw 'bD.404';
            for (const deriveStatement of Derive) {
                const parsed = tryParse(deriveStatement, reDeriveMediumKey);
                if (parsed !== null) {
                    const { camelQry, propName, propType } = parsed;
                    const { getQuery } = await import('trans-render/lib/specialKeys.js');
                    const queryInfo = getQuery(camelQry);
                    const { query, attrib } = queryInfo;
                    const srcElement = realmToSurvey.querySelector(query);
                    console.log({ queryInfo });
                    let val = undefined;
                    if (attrib !== undefined) {
                        val = srcElement.getAttribute(attrib);
                    }
                    else {
                        if (srcElement instanceof HTMLAnchorElement) {
                            val = srcElement.href;
                        }
                        else if (srcElement instanceof HTMLInputElement) {
                            val = srcElement.value;
                        }
                        else {
                            val = srcElement.textContent;
                        }
                    }
                    switch (parsed.propType) {
                        case 'number':
                            val = Number(val);
                            break;
                        case 'date':
                            val = new Date(val);
                            break;
                    }
                    derivedVals[parsed.propName] = val;
                }
                //console.log({deriveStatement, parsed});
            }
            console.log({ derivedVals });
        }
        if (realmToTransform === null)
            throw 'bD.404';
        if (self.content.childElementCount !== 0) {
            const xmlSrc = realmToTransform.cloneNode(true);
            const { swap } = await import('trans-render/xslt/swap.js');
            swap(xmlSrc, true);
            const xsltStr = `<?xml version="1.0"?>
    <xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    
    <xsl:template match="/">
    ${self.innerHTML}
    </xsl:template>
    </xsl:stylesheet>
            `;
            const xsltNode = new DOMParser().parseFromString(xsltStr, 'text/xml');
            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsltNode);
            const resultDocument = xsltProcessor.transformToFragment(xmlSrc, document);
            if (resultDocument === null)
                throw 'invalid xml/xslt';
            import('obj-ml/obj-ml.js');
            await customElements.whenDefined('obj-ml');
            customElements.upgrade(resultDocument);
            const val = resultDocument.querySelector('obj-ml')?.value;
            Object.assign(derivedVals, val);
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
const reDeriveMediumKey = /^(?<propName>[\w\\]+)As(?<propType>(?<!\\)Number|(?<!\\)Date)(?<!\\)From(?<camelQry>[\w\\]+)/;
const tagName = 'be-derived';
const ifWantsToBe = 'derived';
const upgrade = 'template';
define({
    config: {
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
                simpleSets: ['Affect', 'Survey', 'Target']
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
