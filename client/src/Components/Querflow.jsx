import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Navbar from './navbar'
import Graph from './Graph'
import Map from './Map'
import ButtonBase from './HomeComponents/ButtonBase'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Box } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center"
    },
    h1: {
        fontFamily: 'Comfortaa',
        fontSize: 80
    },
    p: {
        fontFamily: 'Comfortaa',
        fontSize: 25,
        width: '80%',
        textAlign: 'center'

    }
})

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Countries: [],
            Tags: [],
            Flags: []

        }
    }

    componentDidMount = () => {

        this.getTags()
        this.getFlags()
        this.getCountries()

    }

    getTags = () => {
        fetch(`http://localhost:5000/Technology`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    Tags: res
                })
            })

    }
    getFlags = () => {
        fetch(`http://localhost:5000/flags`)
            .then(res => res.json())
            .then(res => this.setState({
                Flags: res
            }))

    }
    getCountries = () => {
        fetch(`http://localhost:5000/countries`)
            .then(res => res.json())
            .then(res => this.setState({
                Countries: res
            }))
    }




    render() {
        const { classes } = this.props;
        return (
            <Router className="App">
                <div>
                    <Navbar></Navbar>
                </div>
                <Route exact path='/' >
                    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mt={10}>
                        <Box>
                            <h1 className={classes.h1}>Welcom to Querflow</h1>
                        </Box>
                        <Box className={classes.p}>
                            Querflow is a visual research platform based on Stackoverflow database.{<br />} The system
                            provides easy Interface to explore programming language development through time &amp;
                            location dimensions.

                        </Box>
                        <Box style={{ width: '80%' }} mt={10} ml={40}>
                            <ButtonBase />
                        </Box>
                    </Box>

                </Route>
                <Route path='/map' exact strict>
                    {<Map Tags={this.state.Tags} Flags={this.state.Flags} ></Map>}

                </Route>
                <Route path='/graph' exact strict>
                    {<Graph Tags={this.state.Tags} countries={this.state.Countries} ></Graph>}
                </Route>
            </Router >
        )
    }
}

export default withStyles(styles)(Home);