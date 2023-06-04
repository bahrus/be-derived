import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeDerived extends BE {
    static get beConfig() {
        return {
            parse: false,
        };
    }
    async attach(enhancedElement, enhancementInfo) {
        super.attach(enhancedElement, enhancementInfo);
        if (!enhancedElement.hasAttribute('itemscope'))
            throw { enhancedElement, msg: 'itemscope missing.' };
        const derivedObject = {};
        const { childrenParsed } = await import('be-a-beacon/childrenParsed.js');
        await childrenParsed(enhancedElement);
    }
    logToConsole(self) {
        const { derivedObject } = self;
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
            logToConsole: {
                ifAllOf: ['resolved', 'log']
            }
        }
    },
    superclass: BeDerived
});
register(ifWantsToBe, upgrade, tagName);
