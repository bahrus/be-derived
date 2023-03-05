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
            <th>Savings</th>
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
    <script nomodule  be-derived='
        Affect parent. //This is set by default.
        Target beScoped:scope. //Not set by default.
        Survey parent. //This is set by default.
        Derive count as number from button.// Uses textContent by default, unless hyper link, in which case it uses href, or input, in which case it uses value.
        Derive count as number from text content of button. //More explicit.
        Derive from itemprop attributes. //Applies logic as spelled out by MDN.
        Derive day of event as date from date time of time element. 
        Derive products as list from data elements.
        Derive product id as number from value of each instance.
        Derive product description from text content of each instance.
        Derive balanceSheet via custom derive something else logic from table element.
        Derive savingsByMonth as list from tr elements.
    '>
        export const deriveSomethingElse = ({host, element}) => {
            return [{

            }] // be-derived will merge the value in
        }
    </script>
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

From the simple example above, it could be argued that it may best to just send down JSON data itself.  

But be-derived could reduce bandwidth when working with:

1.  Large numbers of products / the unspecified table has lots of rows.  And/or
2.  If the entire DOM structure shown above is repeated many times, and the hydrating logic which be-derived is part of is not included with each instance, but rather is applied across all such instances.