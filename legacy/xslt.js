export async function xslt(xsltProcessor, realmToSurvey, derivedVals) {
    let xmlSrc = realmToSurvey;
    if (navigator.userAgent.indexOf("Firefox") !== -1) {
        xmlSrc = xmlSrc.cloneNode(true);
        const outer = document.createElement('div');
        outer.appendChild(xmlSrc);
        xmlSrc = outer;
    }
    const { swap } = await import('trans-render/xslt/swap.js');
    swap(xmlSrc, true);
    const resultDocument = xsltProcessor.transformToFragment(xmlSrc, document);
    if (resultDocument === null)
        throw 'invalid xml/xslt';
    import('obj-ml/obj-ml.js');
    await customElements.whenDefined('obj-ml');
    customElements.upgrade(resultDocument);
    const val = resultDocument.querySelector('obj-ml')?.value;
    Object.assign(derivedVals, val);
}
export function toCanonical(self) {
    if (self.content.childElementCount !== 0) {
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
        return xsltProcessor;
    }
}
