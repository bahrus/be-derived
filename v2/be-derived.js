import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeDerived extends BE {
    static get beConfig() {
        return {
            parse: true,
        };
    }
    async attach(enhancedElement, enhancementInfo) {
        super.attach(enhancedElement, enhancementInfo);
        if (!enhancedElement.hasAttribute('itemscope'))
            throw { enhancedElement, msg: 'itemscope missing.' };
        const derivedObject = {};
        const { childrenParsed } = await import('be-a-beacon/childrenParsed.js');
        await childrenParsed(enhancedElement);
        let itempropElements = Array.from(enhancedElement.querySelectorAll('[itemprop]'));
        itempropElements = itempropElements.filter(x => x.closest('[itemscope]') === enhancedElement);
        const { getItemPropVal } = await import('be-linked/getItemPropVal.js'); //TODO:  rename
        for (const itempropElement of itempropElements) {
            derivedObject[itempropElement.getAttribute('itemprop')] = await getItemPropVal(itempropElement);
        }
        this.derivedObject = derivedObject;
        this.resolved = true;
    }
    logToConsole(self) {
        const { derivedObject } = self;
        console.log({ derivedObject });
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
            log: false,
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            logToConsole: {
                ifAllOf: ['resolved', 'log']
            }
        }
    },
    superclass: BeDerived
});
register(ifWantsToBe, upgrade, tagName);
