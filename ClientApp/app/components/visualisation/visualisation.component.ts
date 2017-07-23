import { Component } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

import * as $ from "jquery";

import { Navigatable } from './../../library/routing/navigatable';
import { ProgressService } from './../../services/progress.service';
import { VisualisationService } from './../../services/visualisation.service';
import { NavService } from './../../services/nav.service';

import { Stock } from './../../library/visualisation/temp-data';

import { easeIn } from './../../library/visualisation/animations';

@Component({ 
    selector: 'visualisation',
    templateUrl: './visualisation.component.html',
    styleUrls: ['./visualisation.component.min.css'],
    animations: [easeIn]
})
export class VisualisationComponent extends Navigatable {

    // Example used:
    // https://github.com/datencia/d3js-angular2-example/tree/master/01_line_chart

    private graphicsContainerElementId: string = "#graphicsRow";
    private lineChartId: string = "#lineChart";

    private margin = { top: 20, right: 20, bottom: 30, left: 50 };
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private lineChartSvg: any;
    private line: d3Shape.Line<[number, number]>;
    private stocks: Stock[] = [];

    constructor(progressService: ProgressService, private visualisationService: VisualisationService) {
        super(progressService);
    }

    ngOnInit() {

        this.width = $(this.graphicsContainerElementId).width() - this.margin.left - this.margin.right;
        this.height = 600 - this.margin.top - this.margin.bottom;

        this.visualisationService
            .getStocks()
            .takeUntil(this.componentDestroying)
            .subscribe(
                stocks => {
                    this.stocks = stocks;

                    this.initSvg()
                    this.initAxis();
                    this.drawAxis();
                    this.drawLine();

                    this.workFinished();
                },
                error => {
                    this.workFinished();
                });
    }

    ngOnDestroy() {
        this.workOngoing();
    }

    private initSvg() {
        this.lineChartSvg = d3.select(this.lineChartId)
            .attr("width", "100%")
            .attr("height", "600px")
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
    }

    private initAxis() {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(d3Array.extent(this.stocks, (d) => d.date));
        this.y.domain(d3Array.extent(this.stocks, (d) => d.value));
    }

    private drawAxis() {

        this.lineChartSvg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.x));

        this.lineChartSvg.append("g")
            .attr("class", "axis axis--y")
            .call(d3Axis.axisLeft(this.y))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Price ($)");
    }

    private drawLine() {
        this.line = d3Shape.line()
            .x((d: any) => this.x(d.date))
            .y((d: any) => this.y(d.value));

        this.lineChartSvg.append("path")
            .datum(this.stocks)
            .attr("class", "line")
            .attr("d", this.line);
    }
}