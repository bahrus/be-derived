# be-derived

## Hemingway Notation.

```html
<div itemscope be-scoped>
    <button>30</button>
    <span itemprop="greeting">Hello</span>
    <time datetime="2018-07-07T20:00:00">20:00</time>
    <script nomodule  be-derived='
        Affect parent. //This is set by default.
        Target beScoped:scope. //Not set by default.
        Derive count as number from button.// Uses textContent by default.
        Derive count as number from text content of button. //More explicit.
        Derive from itemprop attributes. //Applies logic as spelled out by MDN.
        Derive current date as date from date time of time element. 
    '>
    </script>
</div>
```

...ends up with: 

```JavaScript
oDiv.beDecorated.scoped.scope = {
    count: 30,
    greeting: 'Hello',
    currentDate: new Date("2018-07-07T20:00:00")
}
```