# be-derived

[![Playwright Tests](https://github.com/bahrus/be-derived/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-derived/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-derived.png)](http://badge.fury.io/js/be-derived)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-derived?style=for-the-badge)](https://bundlephobia.com/result?p=be-derived)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-derived?compression=gzip">

*be-derived* is a custom element enhancer that derives data from server-rendered HTML, in particular microdata HTML that is compatible with [be-sharing](https://github.com/bahrus/be-sharing). 

```html
<div 
    itemscope
    be-derived
    be-sharing='
        Derive.
        Share count from scope.
    '
>
    <data be-a-beacon itemprop="count" value=30>Thirty</data>
</div>
```

What be-derived does:

1.  Waits for signal from be-a-beacon before commencing (until platform fixes this).
2.  Extracts a JSON-ld like object from the microdata-laced HTML within its scope.  Stores it in: oDiv.beEnhanced.beDerived.derivedObject
3.  Indicates it has been resolved.

What be-sharing does:

1.  When it encounters "Derive", ensures that be-derived is employed to derive the object.
2.  Waits be-derived to finish.
3.  Suspends any updates to the UI.
4.  Copies values from derivedObject to scope, host and/or enhanced element according to the rules set out by 
