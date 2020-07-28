import React, { PureComponent } from 'react';
import { Button, Box, Paper } from '@material-ui/core'
import ComparisonBarCountry from './GraphComponents/ComparisonBarCountry'
import ComparisonBarTech from './GraphComponents/ComparisonBarTech'
import LoadingOverlay from 'react-loading-overlay';
import { styled } from '@material-ui/core/styles';
import KPI from './GraphComponents/KPIpaper'
import LineChartcu from './GraphComponents/LineChartCustum'
import HoverExample from './GraphComponents/Hover'
import CustomizedSwitches from './GraphComponents/SwitchKPI'
import 'chart.js'

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #F9BE8F 10%, #F96113 90%)',
    border: '2px solid #7B4008',
    borderRadius: 10,
    height: 60,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textTransform: 'none',
    boxShadow: '4px 4px 13px 0px',
    fontSize: 16,
    fontFamily: 'Comfortaa',
    fontWeight: 'bold',
    //position: "absolute",
    padding: '0 5px'
});



export default class Graph extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            Countries: props.countries,
            Tags: props.Tags,
            Loading: false,
            TechChoosen: [],
            CountryChoosen: [],
            Result: [],
            kpiChoosen: "KPI 1",
            yAxis: "",
        }
        this.handleClick = async (value) => {
            this.setState({
                Loading: !this.state.Loading
            })
        }

    }

    getTech = (value) => {
        this.setState({
            TechChoosen: value,
        })
    }
    getCountries = (value) => {
        this.setState({
            CountryChoosen: value,
        })
    }

    showButton = () => {
        if (this.state.Result.length > 1) {
            return (<MyButton onClick={this.switch} style={{ width: '126px', }}  >same tech in one graph</MyButton>)
        }
    }
    transformArr = (techs, countries) => {
        let data = Array.apply(null, { length: techs }).map(function () { });
        for (let i = 0; i < techs; i++) {
            for (let j = 0; j < countries; j++) {
                data[i] = Array.apply(null, { length: countries }).map(function () { });
            }
        }
        console.log(data)
        return data
    }


    analyse = async () => {
        const techs = this.state.TechChoosen
        let countries = this.state.CountryChoosen.map(c => c.toString().toLowerCase());
        var result = []
        var resultSpacial = [[]]
        for (let i = 0; i < countries.length; i++) {
            var data = await Promise.all(techs.map(async tech => {
                const res = await fetch(`http://localhost:5000/involved/${tech.TagName}/${countries[i]}`)
                const json = res.json()
                return json
            }))
            result.push(data);
        }
        if (result.length > 1 && techs.length == 1) {
            resultSpacial[0].push(result[0][0])
            for (let i = 1; i < result.length; i++) {
                resultSpacial[0].push(result[i][0]);
            }
        }
        if (!(Array.isArray(resultSpacial) && resultSpacial[0].length)) {
            console.log(result)
            this.setState({
                Result: result
            })
        } else {
            console.log(resultSpacial)
            this.setState({
                Result: resultSpacial
            })
        }
    }
    switch = () => {
        var old = this.state.Result;
        var numTechs = old[0].length;
        let numCountry = this.state.Result.length;
        var result = this.transformArr(numTechs, numCountry)
        for (let i = 0; i < numTechs; i++) {
            for (let j = 0; j < numCountry; j++) {
                result[i][j] = old[j][i]
            }
        }
        console.log(result)
        this.setState({
            Result: result
        })
    }

    switchKPI = (country) => {
        let data = Array.apply(null, { length: country.length }).map(x => []);
        country.map((tech, j) => {
            if (this.state.kpiChoosen === "KPI 1") {
                tech.data1.map((point, i) => { data[j].push({ x: point[0], y: parseFloat(point[1]), tooltip: tech.allData[i].Counter + " Users \n" + tech.allData[i].TotalUsers + " Total Users", kpi: this.state.yAxis }) })
                this.setState({
                    yAxis: "Tech usage rate"
                })
            }
            else {
                tech.data2.map((point, i) => { data[j].push({ x: point[0], y: parseFloat(point[1]), tooltip: tech.allData[i].CountAnswer + " Answers \n" + tech.allData[i].CountQuestion + " Questions", kpi: this.state.yAxis }) })
                //data.push({ "data": tech.data2, "name": tech.name, "labels": tech.allData.map(year => year.CountQuestion + " Questions \n" + year.CountAnswer + " Answers") })
                this.setState({
                    yAxis: "Ans/Ques"
                })
            }
        })
        console.log(data)
        return data
    }

    kpiButton = (value) => {
        if (value === true) {
            this.setState({ kpiChoosen: "KPI 1" })
        } else this.setState({ kpiChoosen: "KPI 2" })

    }

    makeTechNames = (country) => {
        let names = Array.apply(null, { length: country.length }).map(() => { })
        for (let i = 0; i < names.length; i++) {
            names[i] = country[i].name
        }
        return names
    }

    render() {

        return (
            <div style={{ width: '100%' }}>
                <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} >
                    <Box display="flex" flexDirection="column"  >
                        <Paper style={{ backgroundColor: '#FFFD85', border: '1px solid #2E0E00', borderRadius: 10, height: 200, marginTop: 3 }} elevation={3}>
                            <Box display="flex" flexDirection="row" m={1}>
                                <Box display="flex" flexDirection="column"  >
                                    <Box display="flex" p={1}>
                                        <ComparisonBarCountry Countries={this.state.Countries} getCountries={this.getCountries} display="block" ></ComparisonBarCountry >
                                    </Box>
                                    <Box p={1}>
                                        <ComparisonBarTech Tags={this.state.Tags} getTech={this.getTech} display="block" ></ComparisonBarTech >
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" p={1}>
                                    <Box>
                                        <MyButton onClick={this.analyse}>Analyse</MyButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper style={{ backgroundColor: '#FFFD85', border: '1px solid #2E0E00', borderRadius: 10, marginTop: 3 }} elevation={3}>
                            <Box display="flex" justifyContent="left" flexDirection="row" alignItems='center' p={1}>
                                <Box display="flex" justifyContent="flex-start" flexDirection="column" p={1}>
                                    <CustomizedSwitches onChange={this.kpiButton} onChange2={this.kpiButton2}></CustomizedSwitches>
                                </Box>
                                <Box ml={20} mt={2}>{this.showButton()}</Box>
                            </Box>
                        </Paper>
                    </Box>
                    <Box display="flex" flexDirection="column" ml={1} mt={1}>
                        <Paper style={{ backgroundColor: '#FFFD85', border: '1px solid #2E0E00', borderRadius: 10, height: 325 }} elevation={3}>
                            <KPI></KPI>
                        </Paper>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="row" justifyContent="flex-start" m={1} p={1} flexWrap="wrap" css={{ maxWidth: '100%' }} >
                    {this.state.Result.map((country, i) =>
                        <div key={i}>
                            <Box key={i + 2} p={1}>
                                <LineChartcu
                                    key={i + 3}
                                    data={this.switchKPI(country)}
                                    title={this.makeTechNames(country)}
                                    color={['#9999FF', '#99FF99', '#003300', '#FF8080', '#B30095']}
                                ></LineChartcu>

                            </Box>
                        </div>
                    )}
                </Box>
            </div >
        )
    }
}
