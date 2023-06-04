export function itemize(realmToSurvey, derivedVals) {
    const itempropElements = Array.from(realmToSurvey.querySelectorAll('[itemprop]'));
    for (const itempropElement of itempropElements) {
        const itemprop = itempropElement.getAttribute('itemprop');
        let val;
        switch (itempropElement.localName) {
            case 'a':
                val = itempropElement.href;
                break;
            case 'input':
                switch (itempropElement.type) {
                    case 'range':
                    case 'number':
                        val = itempropElement.valueAsNumber;
                        break;
                    case 'date':
                        val = itempropElement.valueAsDate;
                        break;
                    default:
                        val = itempropElement.value;
                }
                break;
            default:
                val = itempropElement.textContent;
        }
        derivedVals[itemprop] = val;
    }
}
