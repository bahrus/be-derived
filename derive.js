export async function derive(deriveRules, realmToSurvey, derivedVals) {
    for (const deriveRule of deriveRules) {
        const { queryInfo } = deriveRule;
        const { query, attrib } = queryInfo;
        const srcElement = realmToSurvey.querySelector(query);
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
        const { as, derive } = deriveRule;
        switch (as) {
            case 'number':
                val = Number(val);
                break;
            case 'date':
                val = new Date(val);
                break;
        }
        derivedVals[derive] = val;
    }
}
export async function toCanonical(Derive) {
    const { tryParse } = await import('be-decorated/cpu.js');
    const returnObj = [];
    for (const deriveStatement of Derive) {
        const parsed = tryParse(deriveStatement, reDeriveMediumKey);
        if (parsed !== null) {
            const { camelQry, propName, propType } = parsed;
            const { getQuery } = await import('trans-render/lib/specialKeys.js');
            const queryInfo = getQuery(camelQry);
            const deriveRule = {
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
const reDeriveMediumKey = /^(?<propName>[\w\\]+)As(?<propType>(?<!\\)Number|(?<!\\)Date)(?<!\\)From(?<camelQry>[\w\\]+)/;
