import React, { PureComponent } from 'react';
import Chart from 'chart.js'



export default class LineChartcu extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate() {
        //this.myChart.data.labels = this.props.data[0].map(d => d.x);
        this.myChart.data.datasets = this.makeDataSets(this.props.data);
        this.myChart.update();
    }
    makeDataSets = (data) => {
        let result = []
        data.map((tech, i) => {
            let series = {}
            series.label = this.props.title[i]
            series.data = tech.map(d => d.y)
            series.fill = 'none'
            series.backgroundColor = this.props.color[i]
            series.pointRadius = 2
            series.borderColor = this.props.color[i]
            series.borderWidth = 3
            series.lineTension = 0
            series.footer = tech.map(d => d.tooltip)
            series.kpi = tech[0].kpi
            result.push(series)
        })
        //console.log(result)
        return result
    }

    componentDidMount() {
        this.myChart = new Chart(this.canvasRef.current, {
            type: 'line',
            options: {
                maintainAspectRatio: false,
                animation: {
                    duration: 0
                },
                scales: {
                    yAxes: [
                        {
                            stacked: false,
                            scaleLabel: {
                                fontFamily: 'Comfortaa', fontStyle: 'initial', fontSize: 20, labelString: 'KPI', display: true, rotate: 90
                            },
                            ticks: {
                                callback: function (label) {
                                    return label + '%';
                                },
                                fontColor: "#853411"
                            }
                        }
                    ],
                    xAxes: [
                        {
                            ticks: { fontColor: "#853411" },
                            scaleLabel: { fontFamily: 'Comfortaa', fontStyle: 'initial', fontSize: 20, labelString: 'Year', display: true }
                        }
                    ]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            console.log(data.datasets[0].kpi)
                            return ((data.datasets[0].kpi + ' ') + Math.round(tooltipItem.yLabel * 100) / 100 + "%")
                        },
                        footer: function (tooltipItem, data) {
                            console.log(tooltipItem, data)
                            var foot = data.datasets[tooltipItem[0].datasetIndex].footer[tooltipItem[0].index] || '';
                            return foot

                        },
                        afterTitle: function (tooltipItem, data) {
                            return data.datasets[tooltipItem[0].datasetIndex].label || ''
                        }
                    }
                }
            },
            data: {
                labels: this.props.data[0].map(d => d.x),
                datasets: this.makeDataSets(this.props.data)
            }
        });
    }

    render() {
        return <canvas style={{ width: '600px', height: "400px" }} ref={this.canvasRef} />;
    }
}
