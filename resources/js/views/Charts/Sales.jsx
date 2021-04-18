import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SalesData from "./SalesData";

export default class Sales extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {

        am4core.useTheme(am4themes_animated);
        let chart = am4core.create("usageChart", am4charts.XYChart);

        // Add data
        chart.data = SalesData;
        // Display numbers as percent
        chart.numberFormatter.numberFormat = "#.#' kwh'";

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.opposite = false;//number list
        valueAxis.renderer.grid.template.disabled = false;//graph

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.tensionX = 0.8;
        series.tooltipText = "Average usage\n\n[bold font-size: 30]{valueY}[/]";

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.radius = 4;
        bullet.circle.strokeWidth = 2;
        bullet.circle.fill = am4core.color("#fff");

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        this.chart = chart;

    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
    render() {
        console.log("d================>", this.props.chartddata);
        console.log("y================>", this.props.chartydata);
        return (
            <div>
                <h1>Average {this.props.charttype} Usage History</h1>
                <div id="usageChart" style={{ width: "100%", height: "500px" }} />
            </div>
        );
    }
}
