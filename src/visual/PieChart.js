import React, { Component } from 'react';
import * as d3 from 'd3';

import { LabeledArc } from './Arc';

class Piechart extends Component {
    constructor(props) {
        super(props);

        this.pie = d3.layout.pie()
            .value((d) => d.value);
        this.colors = d3.scale.category10();
    }

    arcGenerator(d, i) {
    }

    render() {
    }
}

export default Piechart;