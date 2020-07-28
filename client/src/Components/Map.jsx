import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
//import Slider from './MapComponents/Slider';
import Countries from '../Boundries/countries.json'
import YearSlider from './MapComponents/YearSlider'
import NormalizeButton from './MapComponents/NormalizeButton'
import ComparisonBar from './MapComponents/ComparisonBar'
import Feature from './MapComponents/Feature'
import TableComp from './MapComponents/TableComp'
import TechComp from './MapComponents/TechComp'
import { Button } from '@material-ui/core'
import LoadingOverlay from 'react-loading-overlay';
const Wrapper = styled.div`

width: ${props => props.width}
height: ${props => props.height}
border:${props => props.border}
`;

export default class Map extends Component {

    constructor(props) {

        super(props);
        this.section = React.createRef();
        this.state = {

            Tags: props.Tags,
            Flags: props.Flags,
            Year: 2015,    //the year from the slider
            TechResearch: [], //the tech i want to research
            GeoJsonFile: JSON.parse(JSON.stringify(Countries)),
            Layer: Countries,
            Normalize: 'minmax',//nomalize technique
            TechChoosen: [],
            Loading: false



        }
        this.handleClick = async (value) => {
            this.setState({
                Loading: !this.state.Loading
            })
            await this.getTechResearch(value);

        }
    }



    LoadMap = () => {          //load the map

        var corner1 = L.latLng(-250, 250)
        var corner2 = L.latLng(250, -250)



        this.map = L.map('map', {
            maxBounds: L.latLngBounds(corner1, corner2),
            center: [45, 15],
            zoom: 0,
            zoomControl: false,




        });
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 7,
            minZoom: 2,


        }).addTo(this.map);
        this.layer = L.geoJSON().addTo(this.map)
    }
    addFlag = () => {
        Countries.features.map(item => {
            this.state.Flags.map(flag => {
                if (item.id === flag.alpha3)
                    item.pic = flag.file_url
            })
        })
        this.state.GeoJsonFile.features.map(item => {
            this.state.Flags.map(flag => {
                if (item.id === flag.alpha3)
                    item.pic = flag.file_url
            })
        })


    }
    componentWillMount = () => {
        this.addFlag()
    }

    componentDidMount = () => {



        this.LoadMap();
        this.LayerGroup = L.layerGroup().addTo(this.map)

        //this.getInvolvedYear()
        this.initsetStyle()


    }

    initsetStyle = () => {
        this.layer = L.geoJSON(Countries, {                       //making style for counteries

            style: function (feature) {

                return {
                    color: 'black',//stroke(border) color
                    fillColor: 'green',// the color of the filler
                    fillOpacity: 0,

                    stroke: false, //like border



                }



            },
            onEachFeature: function (feature, layer) {

                const questionMark = 'https://image.flaticon.com/icons/svg/906/906794.svg'
                const answerMark = 'https://image.flaticon.com/icons/svg/475/475760.svg'


                layer.bindTooltip(function () {
                    return feature.properties.name



                }) // when hover tooltip
                // layer.(feature.properties.name)

                layer.on("mouseover", function () {
                    this.setStyle({
                        stroke: true,
                        weight: 1,
                        color: 'grey'
                    })
                })
                layer.on('mouseout', function () {
                    this.setStyle({ stroke: 0 })
                })


            },



        }).addTo(this.map)



    }



    setStyle = (norm) => {
        console.log(this.c)
        this.layer = L.geoJSON(this.c, {                       //making style for counteries

            style: function (feature) {//styling for one technology
                // console.log(Object.keys(feature.properties).length)
                // console.log(feature.properties)
                switch (Object.keys(feature.properties).length) {
                    case 9:
                        if (norm === 'minmax')
                            return {
                                color: 'black',//stroke(border) color
                                fillColor: 'green',// the color of the filler
                                fillOpacity: feature.properties.color1,

                                stroke: false, //like border



                            }
                        else return {
                            color: 'black',//stroke(border) color
                            fillColor: 'green',// the color of the filler0
                            fillOpacity: feature.properties.color2,

                            stroke: false, //like border

                        }
                        break
                    case 2:

                        if (norm === 'minmax') {
                            var color = feature.properties[0].counter > feature.properties[1].counter ? 'green' : 'red'
                            var opacity = feature.properties[0].counter > feature.properties[1].counter ? feature.properties[0].color1 : feature.properties[1].color1
                            return {
                                color: 'black',//stroke(border) color
                                fillColor: color,// the color of the filler
                                fillOpacity: opacity,

                                stroke: false, //like border



                            }
                        }

                        else return {

                            color: 'black',//stroke(border) color
                            fillColor: feature.properties[0].counter > feature.properties[1].counter ? 'green' : 'red',// the color of the filler0
                            fillOpacity: feature.properties[0].color2,

                            stroke: false, //like border

                        }
                        break


                }
            },
            onEachFeature: function (feature, layer) { //featuring for one technology

                layer.bindPopup(() => {

                    switch (Object.keys(feature.properties).length) {
                        case 9:
                            if (norm === 'minmax')


                                return `<div><strong>${feature.properties.counter.toString()} Users</strong> <div style={{display:flex}}>${feature.properties.question.toString()} Questions</div><div>${feature.properties.answer.toString()} Answers</div></div>`
                            else return `<strong>${feature.properties.counter.toString()} Users</strong> <div>${feature.properties.totalusers.toString()} Total Users</div><div>${parseInt((feature.properties.color2 * 100)).toString()}% Ratio</div>`
                            break

                        case 2:
                            if (norm === 'minmax')
                                return `<div><table>
                                <tr>
                    <th><img style="width:30px; border:1px solid black" src=${feature.pic}></img></th>
                    <th align="center">${feature.properties[0].technology.toString()}</th>
                    <th align="center">${feature.properties[1].technology.toString()}</th>
                  </tr>
                  <tr>
                    <td>Users</td>
                    <td align="center">${feature.properties[0].counter.toString()}</td>
                    <td align="center">${feature.properties[1].counter.toString()}</td>
                  </tr>
                  <tr>
                    <td>Questions</td>
                    <td align="center">${feature.properties[0].question.toString()}</td>
                    <td align="center">${feature.properties[1].question.toString()}</td>
                  </tr>
                  <tr>
                    <td>Answers</td>
                    <td align="center">${feature.properties[0].answer.toString()}</td>
                    <td align="center">${feature.properties[1].answer.toString()}</td>
                  </tr>
                                </table>${ReactDOMServer.renderToString(<Feature feature={feature}></Feature>)}</div>`

                            // return `<strong>${feature.properties[0].counter.toString()} Users</strong> <div style={{display:flex}}>${feature.properties[0].question.toString()} Questions</div><div>${feature.properties[0].answer.toString()} Answers</div> `
                            //`<strong>${feature.properties[0].counter.toString()} Users</strong> <div>${feature.properties[0].totalusers.toString()} Total Users</div><div>${parseInt((feature.properties[0].color2 * 100)).toString()}% Ratio</div>`
                            else return `<div><table>
                            <tr>
                <th><img style="width:30px; border:1px solid black" src=${feature.pic}></img></th>
                <th>${feature.properties[0].technology.toString()}</th>
                <th>${feature.properties[1].technology.toString()}</th>
              </tr>
              <tr>
                <td>Users</td>
                <td align="center">${feature.properties[0].counter.toString()}</td>
                <td align="center">${feature.properties[1].counter.toString()}</td>
              </tr>
              <tr>
                <td>Total users</td>
                <td colspan="2" align="center">${feature.properties[0].totalusers}</td>

              </tr>
              <tr>
                <td>Ratio by total</td>
                <td align="center">${parseInt((feature.properties[0].counter / feature.properties[0].totalusers * 100) || 0).toString()}%</td>
                <td align="center">${parseInt((feature.properties[1].counter / feature.properties[0].totalusers * 100) || 0).toString()}%</td>
              </tr>
                            </table>${ReactDOMServer.renderToString(<Feature feature={feature}></Feature>)}</div>`
                            break

                    }
                })// when click do popup
                layer.bindTooltip(function () {
                    switch (Object.keys(feature.properties).length) {
                        case 9:
                            return feature.properties.name
                            break
                        case 2:
                            return feature.properties[0].name
                            break
                    }


                }) // when hover tooltip
                // layer.(feature.properties.name)

                layer.on("mouseover", function () {
                    this.setStyle({
                        stroke: true,
                        weight: 1,
                        color: 'grey'
                    })
                })
                layer.on('mouseout', function () {
                    this.setStyle({ stroke: 0 })
                })

            },



        }).addTo(this.map)



    }

    getYear = (year) => {
        if (this.state.Year !== year)
            this.setState({
                Year: parseInt(year.target.innerText),
            })
        if (this.state.TechResearch.length !== 0) {
            console.log(this.state.TechResearch.length)
            this.getTechnologyYear(this.state.TechChoosen)
        }



    }



    GetNew = () => {
        this.map.removeLayer(this.layer)
        this.setStyle(this.state.Normalize);

    }
    getNormalize = (value) => {
        this.setState({ Normalize: value })
        this.map.removeLayer(this.layer)
        this.setStyle(value);

    }

    async getTechResearch(value) {//async
        this.setState({
            TechResearch: value
        })//await

        await this.getTechnology(value)

        if (value.length === 0) {
            this.map.removeLayer(this.layer)
            console.log(this.state.GeoJsonFile)
            this.setState({
                Layer: this.state.GeoJsonFile,

            })


            this.initsetStyle()

        }

    }


    async getTechnology(techs) { //bring technologies from databse
        const techChoosen = await Promise.all(techs.map(async tech => {
            const res = await fetch(`http://localhost:5000/involved/${tech.TagName}`)
            const json = res.json()
            return json
        }))
        console.log(techs)

        this.setState({
            TechChoosen: techChoosen,
            Loading: !this.state.Loading
        })
        this.getTechnologyYear(techChoosen)


    }
    getMinMax = (country) => {  //getting the the min max value for normalization


        var array = []
        var array2 = []

        country.features.map(item => {
            array.push(item.properties.counter)
            array2.push(isNaN((item.properties.counter / (item.properties.totalusers))) == true ? 0 : item.properties.counter / (item.properties.totalusers))
            item.properties.color2 = (isNaN((item.properties.counter / (item.properties.totalusers))) == true ? 0 : item.properties.counter / (item.properties.totalusers))


        })


        return {
            maxValue: Math.max.apply(Math, array),
            minValue: Math.min.apply(Math, array),
            maxValue2: Math.max.apply(Math, array2),
            minValue2: Math.min.apply(Math, array2),


        }

    }


    getTechnologyYear = (choosen) => {
        var techChoosenYear = choosen.map(item => {
            const results = item.filter(k => k.features[0].properties.year == this.state.Year)

            return results[0]
        })
        var Merged = this.MergeFeatures(techChoosenYear)
        console.log(Merged)

        this.setState({ Layer: Merged })
        this.GetNew()
    }
    MergeFeatures = (collections) => {

        var numOfTechs = collections.length
        this.c = JSON.parse(JSON.stringify(Countries))
        switch (numOfTechs) {
            case 1:
                for (var i = 0; i < this.c.features.length; i++) {
                    this.c.features[i].properties = collections[0].features[i].properties
                }
                break

            case 2:
                for (var i = 0; i < this.c.features.length; i++) {
                    this.c.features[i].properties = [collections[0].features[i].properties, collections[1].features[i].properties]
                }
                break
        }
        this.setState({
            Loading: false
        })

        return this.c



    }


    addMarkers = (e) => {//not that good have to fix it

        var icon = new L.icon({
            iconSize: [20, 27],
            iconAnchor: [13, 27],
            popupAnchor: [1, -24],
            iconUrl: 'https://clipartart.com/images/google-maps-marker-transparent-clipart.png'
        })
        e = e.key
        switch (Object.keys(e.properties).length) {
            case 1:
            case 9:
                if (e.geometry.type === 'Polygon') {
                    this.marker = L.marker([e.geometry.coordinates[0][0][1], e.geometry.coordinates[0][0][0]], { icon: icon }).addTo(this.LayerGroup);
                    this.marker.bindPopup(e.properties.name).openPopup()
                }
                else {
                    this.marker = L.marker([e.geometry.coordinates[0][0][0][1], e.geometry.coordinates[0][0][0][0]], { icon: icon }).addTo(this.LayerGroup);
                    this.marker.bindPopup(e.properties.name).openPopup()

                }
                break
            case 2:
                if (e.geometry.type === 'Polygon') {
                    this.marker = L.marker([e.geometry.coordinates[0][0][1], e.geometry.coordinates[0][0][0]], { icon: icon }).addTo(this.LayerGroup);
                    this.marker.bindPopup(e.properties[0].name).openPopup()
                }
                else {
                    this.marker = L.marker([e.geometry.coordinates[0][0][0][1], e.geometry.coordinates[0][0][0][0]], { icon: icon }).addTo(this.LayerGroup);
                    this.marker.bindPopup(e.properties[0].name).openPopup()

                }
                break

        }


    }

    clearMarkers = () => {
        this.LayerGroup.clearLayers()
    }
    handleScroll = () => {
        this.section.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        })
    }



    render() {

        return (
            <div>
                <LoadingOverlay
                    active={this.state.Loading}
                    spinner
                    text='Loading your content...'
                >
                    <ComparisonBar Tags={this.state.Tags} getTechResearch={this.handleClick}></ComparisonBar>

                    <div style={{ position: 'relative', display: "flex", justifyContent: "center", alignItems: "center", paddingTop: '10px' }}>

                        <Wrapper id='map' style={{ height: '70vh', zIndex: 1, width: '98vw', boxShadow: '0 0px 20px' }}></Wrapper>
                        <NormalizeButton getNormalize={this.getNormalize} ></NormalizeButton>
                        <YearSlider GetNew={this.GetNew} getYear={this.getYear}></YearSlider>
                        <Button style={{ position: 'absolute', zIndex: 2, left: 15, bottom: 10, boxShadow: '0 0px 20px' }} onClick={this.clearMarkers}>Clear Markers</Button>
                        <TechComp techs={this.state.TechResearch}></TechComp>
                        <div onClick={this.handleScroll} style={{ position: 'absolute', bottom: '-20px', left: '50%', zIndex: 3, transform: 'translate(-50%, -50%)', margin: '0', marginRight: '-50%', backgroundColor: 'white', width: '100px', boxShadow: '0 0px 20px', textAlign: 'center', borderRadius: '20px', cursor: 'grab' }} >More stats</div>
                    </div>
                    <div ref={this.section} >
                        {console.log(this.state.GeoJsonFile)}

                        <TableComp className='tbl' data={this.state.Layer} tech={this.state.TechResearch} addMarker={this.addMarkers} ></TableComp>
                    </div>
                </LoadingOverlay>
            </div >
        )
    }

}
