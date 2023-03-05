import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeDerived extends EventTarget {
    async camelToCanonical(pp, mold) {
        const { camelConfig, self } = pp;
        let { affect, target, survey } = camelConfig;
        affect = affect || 'previousElementSibling';
        survey = survey || affect;
        const { findRealm } = await import('trans-render/lib/findRealm.js');
        const realmToTransform = await findRealm(self, affect);
        if (realmToTransform === null)
            throw 'bD.404';
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
        console.log({ val });
        let affected = await findRealm(self, affect);
        if (target !== undefined) {
            const { beSplit } = await import('be-decorated/cpu.js');
            const split = await beSplit(target);
            if (split !== undefined) {
                const { setProp } = await import('trans-render/lib/setProp.js');
                await setProp(affected, split.path, val);
            }
        }
        else {
            Object.assign(affected, val);
        }
        return mold;
    }
}
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
