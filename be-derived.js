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
        const { childrenParsed } = await import('be-a-beacon/childrenParsed.js');
        await childrenParsed(enhancedElement);
        const { getItemScopeObject } = await import('be-linked/getItemScopeObject.js');
        this.derivedObject = await getItemScopeObject(enhancedElement);
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
