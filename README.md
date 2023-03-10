# be-derived [TODO]

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
    <obj-ml 
        product-list
    >
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

What this does in the middle:

1.  Applies xslt transform of the contents inside the template with the element specified by Survey parameter.
2.  Invokes an instance of obj-ml web component.
3.  Sets attributes, innerHTML to the output of the transformation.
4.  Calls method "attach".
5.  Pulls value from obj-ml.
6.  Assigns value to scope.

