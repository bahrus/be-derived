# be-derived [WIP]

*be-derived* is an element decorator that derives data from server-rendered HTML.  It can adorn either a template or a script element.

*be-derived* supports multiple ways of extracting data from the HTML.  For common cases, we can utilize easy to read "Hemingway Notation" as shown below:

## Hemingway Notation.

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
    Survey previous element sibling. //This is set by default.
    Derive count as number from button.
    Derive day of event as date from datetime attribute.
    Itemize.
'>
    <obj-ml>
        <xsl:for-each select="div/ul/li">
            <li-ml itemprop="product" id="{data/@value}" description="{data/text()}"></li-ml>
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
    balanceSheet:  [

    ]
}
```

The example above also illustrates an additional mechanism for extracting more complex scenarios:  XSLT contained within the template, combined with the [obj-ml](https://github.com/bahrus/obj-ml) custom element.

## Last resort -- scripting [TODO]

For even more complex scenarios, use a script tag instead of a template tag, and specify the deriving function thusly [TODO]:

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

What this does in the middle:

1.  Applies xslt transform of the contents inside the template with the element specified by Survey parameter.
2.  Invokes an instance of obj-ml web component.
3.  Sets attributes, innerHTML to the output of the transformation.
4.  Calls method "attach".
5.  Pulls value from obj-ml.
6.  Assigns value to scope.



