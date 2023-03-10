export async function script(self, realmToSurvey, derivedVals) {
    const { doBeHavings } = await import('trans-render/lib/doBeHavings.js');
    import('be-exportable/be-exportable.js');
    await doBeHavings(self, [{
            be: 'exportable',
            waitForResolved: true,
        }]);
    const fn = self._modExport['derive'];
    await fn({ element: realmToSurvey, derivedVals });
}
