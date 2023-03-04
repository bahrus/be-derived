# be-derived

## Hemingway Notation.

```html
<div itemscope be-scoped>
    <button>30</button>
    <span itemprop="greeting">Hello</span>
    <script nomodule  be-derived='
        Affect parent. //This is set by default.
        Target beScoped:scope. //Not set by default.
        Derive count as number from button.// Uses textContent by default.
        Derive count as number from text content of button. //More explicit.
        Derive from itemprop attributes. //Applies logic as spelled out by MDN.
    '>
    </script>
</div>
```