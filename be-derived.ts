import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, CamelConfig} from './types';
import {camelQry, Scope} from 'trans-render/lib/types';

export class BeDerived extends EventTarget implements Actions{
    async camelToCanonical(pp: PP, mold: PPP) {
        const {camelConfig, self} = pp;
        let {affect, target, survey} = camelConfig!;
        affect = affect || 'previousElementSibling';
        survey = survey || affect;
        const {findRealm} = await import('trans-render/lib/findRealm.js');
        const realmToTransform = await findRealm(self, affect) as Element;
        if(realmToTransform === null) throw 'bD.404';
        const xmlSrc = realmToTransform.cloneNode(true) as Element;
        const {swap} = await import('trans-render/xslt/swap.js');
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
        import('obj-ml/obj-ml.js');
        await customElements.whenDefined('obj-ml');
        console.log({resultDocument});
        if(resultDocument !== null){
            customElements.upgrade(resultDocument);
        }
         
        debugger;    
        return mold;
    }


}

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