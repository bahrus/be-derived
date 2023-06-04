export function itemize(realmToSurvey: Element, derivedVals: any){
    const itempropElements = Array.from(realmToSurvey.querySelectorAll('[itemprop]'));
    for(const itempropElement of itempropElements){
        const itemprop = itempropElement.getAttribute('itemprop');
        let val: string | number | Date | undefined | null;
        switch(itempropElement.localName){
            case 'a':
                val = (itempropElement as HTMLAnchorElement).href;
                break;
            case 'input':
                switch ((itempropElement as HTMLInputElement).type){
                    case 'range':
                    case 'number':
                        val = (itempropElement as HTMLInputElement).valueAsNumber;
                        break;
                    case 'date':
                        val = (itempropElement as HTMLInputElement).valueAsDate;
                        break;
                    default:
                        val = (itempropElement as HTMLInputElement).value;
                }
                break;
            default:
                val = itempropElement.textContent;
        }
        derivedVals[itemprop!] = val;
    }

}