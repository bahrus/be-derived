import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, CamelConfig} from './types';
import {camelQry, Scope} from 'trans-render/lib/types';

export class BeDerived extends EventTarget implements Actions{
    async camelToCanonical(pp: PP, mold: PPP) {
        const {camelConfig, self} = pp;
        let {affect, target, survey, Derive} = camelConfig!;
        affect = affect || 'previousElementSibling';
        survey = survey || affect;
        const {findRealm} = await import('trans-render/lib/findRealm.js');
        const realmToTransform = await findRealm(self, affect) as Element;
        console.log({Derive});
        if(Derive !== undefined){
            for(const deriveStatement of Derive){
                const test = reMediumKey.exec(deriveStatement);
                console.log({deriveStatement, test})
            }
        }
        if(realmToTransform === null) throw 'bD.404';
        if(self.content.childElementCount !== 0){
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
            if(resultDocument === null) throw 'invalid xml/xslt';
            import('obj-ml/obj-ml.js');
            await customElements.whenDefined('obj-ml');
            customElements.upgrade(resultDocument);
            const val = resultDocument.querySelector('obj-ml')?.value;
            let affected = await findRealm(self, affect);
            
            if(target !== undefined){
                const {beSplit} = await import('be-decorated/cpu.js');
                const split = await beSplit(target);
                if(split !== undefined){
                    const {setProp} = await import('trans-render/lib/setProp.js');
                    await setProp(affected, split.path, val);
    
                }
            }else{
                Object.assign(affected as any, val);
            }
        }

        
        return mold;
    }


}

const reMediumKey = /^(?<propName>[\w\\]+)As(?<propType>(?<!\\)Number|(?<!\\)Date)(?<!\\)(?<camelQry>[\w\\]+)/;

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