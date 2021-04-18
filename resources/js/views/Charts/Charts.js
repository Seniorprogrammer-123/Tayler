import React, { useState, useEffect, Component } from 'react';
import Head from "../Home/Head";
import { Container } from "@material-ui/core";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios'
import moment from "moment";
import { DatePicker, version } from "antd";
import "antd/dist/antd.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import Sales from "./Sales";

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const Charts = (props) => {
    const classes = useStyles();
    const [m, setM] = React.useState('');
    const [y, setY] = React.useState('');
    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('daily');
    const [dData, setDData] = React.useState({});
    const [yData, setYData] = React.useState({});

    const handleChange = (event) => {
        if (event.target.name == "m") {
            setM(event.target.value);
        }
        if (event.target.name == "y") {
            setY(event.target.value);
        }
        if (event.target.name == "name") {
            setName(event.target.value);
        }
    };
    const today = new Date();
    const year = today.getFullYear();
    let years = [];
    for (let i = 2010; i <= year; i++) {
        years.push(i);
    }

    const bottomStyle = {
        verticalAlign: 'bottom',
        marginBottom: '10px',
        marginLeft: '10px'
    }

    let months = [];
    for (let i = 1; i < 13; i++) {
        months.push(i);
    }

    const dget = () => {
        if((name != '' || name == null) && y > 0 && m > 0){
            axios.get('/api/getbydate/' + m + '/' + y + '/' + name)
                .then(response => {
                    setDData(response.data);
                })
                .catch(error => {
                    console.log(error);
                    // errors: error.response.data.errors;
                })
        }
    }

    const dview = (e) => {
        setType('Daily');
    }

    const yget = () => {
        if((name != '' || name == null) && y ){
            axios.get('/api/getbymonth/' + y + '/' + name)
                .then(response => {
                    // console.log(response.data);
                    setYData(response.data);
                })
                .catch(error => {
                    console.log(error);
                    // errors: error.response.data.errors;
                })
        }
    }

    const yview = (e) => {
        setType('Monthly');
    }

    useEffect(() => {
        yget();
        dget();
    }, [m, y, name]);

    return (
        <>
            <Head />
            <div className="App">
                <Container maxWidth="lg">
                    <br />
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="demo-customized-textbox">Name</InputLabel>
                        <BootstrapInput id="demo-customized-textbox" placeholder="Name" name="name" onChange={handleChange} />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel id="demo-customized-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={m}
                            name="m"
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {months.map((month, index) => (
                                <MenuItem
                                    key={month}
                                    value={month}
                                >
                                    {month}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="demo-customized-select-native">Year</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={y}
                            onChange={handleChange}
                            name="y"
                            input={<BootstrapInput />}
                        >
                            <option aria-label="None" value="" />
                            {years.map((year, index) => (
                                <option
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <Button variant="contained" style={bottomStyle} onClick={dview} color="primary">
                        Daily View
                    </Button>
                    <Button variant="contained" style={bottomStyle} onClick={yview} color="primary">
                        Monthly View
                    </Button>
                    <br />
                    <br />
                    <Sales charttype={type} chartddata={dData} chartydata={yData} />
                </Container>
            </div>
            <Footer />
        </>
    );
}
export default Charts;
