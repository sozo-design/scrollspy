# ScrollSpy Library

A lightweight ScrollSpy library for smooth scrolling animations using Intersection Observer API.

## Installation

```bash
npm install scrollspy
```

## Usage

```html
<link rel="stylesheet" href="node_modules/scrollspy/dist/scrollspy.min.css">

<div sz-scrollspy="delay:500; cls:sz-animation-fade">
  <!-- Your content here -->
</div>

<script type="module">
import ScrollSpy from 'scrollspy';

ScrollSpy.init();
</script>
```

## Demo

To see the ScrollSpy library in action, open the `demo.html` file in your web browser. This demo showcases various animation effects and scrollspy groups.

## Options

- `hidden`: (boolean) Whether to initially hide the element. Default: true
- `delay`: (number) Delay in milliseconds before applying the animation. Default: 300
- `target`: (string) CSS selector for target elements. Default: false (applies to container)
- `cls`: (string) CSS class to apply for animation. Default: 'sz-animation-fade'
- `stagger`: (boolean) Whether to stagger animations of child elements. Default: true
- `repeat`: (boolean) Whether to repeat the animation when scrolling. Default: false

## Available Animation Classes

- sz-animation-fade
- sz-animation-scale-up
- sz-animation-scale-down
- sz-animation-slide-top
- sz-animation-slide-bottom
- sz-animation-slide-left
- sz-animation-slide-right
- (and more... check the CSS file for all available classes)

## License

MIT
