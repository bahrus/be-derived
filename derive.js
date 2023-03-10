export async function derive(Derive, realmToSurvey, derivedVals) {
    const { tryParse } = await import('be-decorated/cpu.js');
    for (const deriveStatement of Derive) {
        const parsed = tryParse(deriveStatement, reDeriveMediumKey);
        if (parsed !== null) {
            const { camelQry, propName, propType } = parsed;
            const { getQuery } = await import('trans-render/lib/specialKeys.js');
            const queryInfo = getQuery(camelQry);
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
}
const reDeriveMediumKey = /^(?<propName>[\w\\]+)As(?<propType>(?<!\\)Number|(?<!\\)Date)(?<!\\)From(?<camelQry>[\w\\]+)/;
