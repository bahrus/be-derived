import {ExportableScript} from 'be-exportable/types';
export async function script(self: HTMLScriptElement, realmToSurvey: Element, derivedVals: any){
    const {doBeHavings} = await import('trans-render/lib/doBeHavings.js');
    import('be-exportable/be-exportable.js');
    await doBeHavings(self, [{
        be: 'exportable',
        waitForResolved: true,
    }]);
    const fn = (self as ExportableScript)._modExport['derive'];
    await fn({element: realmToSurvey, derivedVals});
}