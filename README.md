# be-derived

[![Playwright Tests](https://github.com/bahrus/be-derived/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-derived/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-derived.png)](http://badge.fury.io/js/be-derived)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-derived?style=for-the-badge)](https://bundlephobia.com/result?p=be-derived)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-derived?compression=gzip">

*be-derived* is an element decorator that derives data from server-rendered HTML.  It can adorn either a template or a script element.

*be-derived* supports multiple ways of extracting data from the HTML.  For common cases, we can utilize easy to read "Hemingway Notation" as shown below:

## (Mostly) Hemingway Notation Example.

```html
<div itemscope be-scoped>
    <button>30</button>
    <span itemprop="greeting">Hello</span>
    <time datetime="2018-07-07T20:00:00">20:00</time>
    <ul>
        <li><data value="21053">Cherry Tomato</data></li>
        <li><data value="21054">Beef Tomato</data></li>
        <li><data value="21055">Snack Tomato</data></li>
    </ul>
</div>
<template  be-derived='
    Affect previous element sibling. //This is set by default.
    Target beScoped:scope. //Not set by default.  
    //"Target" adds the ability to home in on a property of the affected element.
    Survey previous element sibling. //This is set by default.
    Derive count as number from button.
    Derive day of event as date from datetime attribute.
    Itemize.
'>
    <obj-ml>
        <xsl:for-each select="div/ul/li">
            <li-ml itemprop="products" id="{data/@value}" description="{data/text()}"></li-ml>
        </xsl:for-each> 
    </obj-ml>
</template>
```

...ends up with: 

```JavaScript
oDiv.beDecorated.scoped.scope = {
    count: 30,
    greeting: 'Hello',
    dayOfEvent: new Date('2018-07-07T20:00:00'),
    products: [
        {productId: 21053, description: 'Cherry Tomato'},
        {productId: 21054, description: 'Beef Tomato'},
        {productId: 21055, description: 'Snack Tomato'}
    ]
}
```

The example above also illustrates an additional mechanism for extracting data from more complex markup, where Hemingway notation falls flat:  XSLT contained within the template, combined with the [obj-ml](https://github.com/bahrus/obj-ml) custom element.

What this does in detail:

1.  Applies xslt transform of the contents inside the template with the element specified by Survey parameter.
2.  Invokes an instance of obj-ml web component.
3.  Sets attributes, innerHTML to the output of the transformation.
4.  Uses customElement.upgrade.
5.  Pulls value from obj-ml.
6.  Assigns value to scope.



## Last resort -- scripting

For even more complex scenarios, use a script tag instead of a template tag, and specify the deriving function thusly:

```html
<div itemscope be-scoped>
    <button>30</button>
    <span itemprop="greeting">Hello</span>
    <time datetime="2018-07-07T20:00:00">20:00</time>
    <ul>
        <li><data value="21053">Cherry Tomato</data></li>
        <li><data value="21054">Beef Tomato</data></li>
        <li><data value="21055">Snack Tomato</data></li>
    </ul>
</div>
<script  be-derived='
    Affect previous element sibling. //This is set by default.
    Target beScoped:scope. //Not set by default.
    Survey previous element sibling. //This is set by default.
    
'>
    export const derive = ({element, derivedVals}) => {
        derivedVals.someProp = {};
    }
</script>
```

## Multiple be-derived elements

If you need to do some derivations via xslt **and** some via scripting, you will need a template tag **and** a script tag.

Since by default the decorator acts on the previous element, that becomes a problem when using multiple be-derived elements.  To specify to target the div:

```html
<div itemscope be-scoped>
    <button>30</button>
    <span itemprop="greeting">Hello</span>
    <time datetime="2018-07-07T20:00:00">20:00</time>
    <ul>
        <li><data value="21053">Cherry Tomato</data></li>
        <li><data value="21054">Beef Tomato</data></li>
        <li><data value="21055">Snack Tomato</data></li>
    </ul>
</div>
<template be-derived='...'></template>
<script nomodule be-derived='
    Affect previous div. 
    Target beScoped:scope.
    Survey previous div.
    
'>
    export const derive = ({element, derivedVals}) => {
        derivedVals.someProp = {};
    }
</script>
```

>**Note**:  When it comes to XSLT, it seems that the common lineage shared between Chrome and WebKit almost guarantees that the XSLT engines will produce identical results.  Not so with Firefox.  So although we should always include Firefox in our tests, that is even more the case when using XSLT.


## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-importing/be-derived.js';

```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-derived';
</script>
```







