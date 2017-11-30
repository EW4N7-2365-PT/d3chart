import {GridlinesChart} from "./class_plot";

const data = [
    {x: 1, y: 2},
    {x: 2, y: 4},
    {x: 3, y: 6},
    {x: 4, y: 8}
];

const config_object = {
    height: 500,
    width: 500,
    margin: 25,
};

new GridlinesChart('#root', config_object)
    .provideData(data)
    .drawChart();