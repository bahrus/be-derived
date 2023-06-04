# be-derived

[![Playwright Tests](https://github.com/bahrus/be-derived/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-derived/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-derived.png)](http://badge.fury.io/js/be-derived)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-derived?style=for-the-badge)](https://bundlephobia.com/result?p=be-derived)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-derived?compression=gzip">

*be-derived* is a custom element enhancer that derives data from server-rendered HTML, in particular microdata HTML that is compatible with [be-sharing](https://github.com/bahrus/be-sharing). 

```html
<div 
    be-sharing='
        Derive.
        Share count from scope.
    '
>
    <data itemprop="count" value=30>Thirty</data>
</div>
```
