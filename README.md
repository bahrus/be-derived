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
    <table>
        <tr>
            <th>Month</th>
            <th>Savings</
        </tr>
        <tr>
            <td>January</td>
            <td>$100</td>
        </tr>
        <tr>
            <td>February</td>
            <td>$300</td>
        </tr>
    </table>
    <template  be-derived='
        Affect parent. //This is set by default.
        Target beScoped:scope. //Not set by default.
        Survey parent. //This is set by default.
    '>
        <o-m 
            count-n="{div/button/text()}"
            day-of-event="{div/time/@datetime}"
        >
            <xsl:for-each select="div/ul/li">
                <o-m name="product" id="{data/@value}" description="{data/text()}"></o-m>
            </xsl:for-each> 
        </o-m>
    </template>
</div>
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

