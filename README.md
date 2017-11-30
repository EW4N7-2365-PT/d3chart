##  Set of easy to use charts for financial data
<p align="center">
<a href="https://travis-ci.org/EW4N7-2365-PT/d3chart/builds"><img src="https://travis-ci.org/EW4N7-2365-PT/d3chart.svg?branch=master" /></a>
<a href="https://david-dm.org/EW4N7-2365-PT/d3chart"><img src="https://david-dm.org/EW4N7-2365-PT/d3chart.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/EW4N7-2365-PT/d3chart?type=dev"><img src="https://david-dm.org/EW4N7-2365-PT/d3chart/dev-status.svg" alt="devDependency Status"></a>
</p>

[demo](https://ew4n7-2365-pt.github.io/d3chart/)
#### Define config object
```javascript
const config = {
    height: /* in px */,
    width: /* in px */,
    margin: /* in px */,
    curve: /* eg. curveBasis default: urveCardinal */,
    invertYAxis: /* default: false */,
    resizeTime: /* resize animation time default: 0 */
};
```

#### Create chart
```javascript
const sample_data = [
    {x: 0, y: 0},
    {x: 1, y: 2},
    {x: 2, y: 4},
    {x: 3, y: 6},
    {x: 4, y: 4},
    {x: 5, y: 7},
    {x: 6, y: 3},
    {x: 7, y: 5},
    {x: 8, y: 7},
    {x: 9, y: 8},
    {x: 10, y: 9},
];

new ChartClass('mount_element',config)
    .initChart()
    .provideData(normalizeData(sample_data))
    .drawChart();
```
#### Resizing
```javascipt
    chartObj.resize(width,height);
```
#### Effects
Every effect class must implement `applyEffect` which receives chart reference as a first argument
and `removeEffect`

Effects **can't** mutate chart data.

#### Available effects
- AreaEffect
- DataPointEffect
- mouseTrackingEffect

#### Applying effects

```javascript
    chart.effects.add('mousetracking', new MouseTrackingEffect({/*config */}), true);
```

#### Styling
Every chart exposes css classes for styling

`ChartBase`
- x-axis
- y-axis

`SingleLineChart`

same as `ChartBase` +
- line

`ChartGridlines`

same as `SingleLineChart` +

- grid
- x-grid
- y-grid