import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Head from "../Home/Head";
import { Container } from "@material-ui/core";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Modal from "@material-ui/core/Modal";
import { useForm } from "react-hook-form";
import axios from 'axios'
import moment from "moment";
import { DatePicker, version } from "antd";
import "antd/dist/antd.css";



const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'Usage Date', minWidth: 100 },
    {
        id: 'population',
        label: 'Amount(kwh)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'del',
        label: 'Actions',
        minWidth: 170,
        align: 'right',
    }
];

function createData(name, code, population, size) {
    const del = <><a href={"/datas/" + size} style={{ padding: '10px', backgroundColor: 'green', color: 'white', textDecoration: 'none' }}>Edit</a>
                &nbsp;<a href={"/datas/" + size} style={{ padding: '10px', backgroundColor: '#AA0000', color: 'white', textDecoration: 'none' }}>Delete</a></>;
    return { name, code, population, size, del };
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 800,
    },
    modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
        //maxWidth: "500px"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    form: {
        fontfamily: "Georgia",
        padding: "20px",
        width: "100%",
        maxWidth: "500px",
        background: "#f4f7f8"
    },
    area: {
        width: "100%",
        background: "rgba(255,255,255,.1)",
        border: "none",
        borderRadius: "4px",
        fontSize: "15px",
        outline: "0",
        padding: "10px",
        margin: "1em auto",
        boxSizing: "border-box",
        backgroundColor: "#e8eeef",
        color: "#8a97a0"
    },
    submit: {
        color: "#FFF",
        margin: "1em auto",
        background: "#1abc9c",
        fontSize: "18px",
        textAlign: "center",
        fontStyle: "normal",
        width: "100%",
        border: "1px solid #16a085",
        borderWidth: "1px 1px 3px",
        marginBottom: "10px",
        padding: "15px"
    }
}));

const Datas = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        address: '',
        email: '',
        usagedata: '',
        phone: '',
        amount: '',
    });
    const { handleSubmit } = useForm(); // initialise the hook
    const onSubmit = async data => {
        // console.log(errors);
        await axios.post('/api/report', errors)
            .then(response => {
                // redirect to the homepage
                if (response.data.success == 'Y') {
                    setOpen(false);
                } else {
                    alert("The error occured in server.");
                }

            })
            .catch(error => {
                console.log(error);
                // errors: error.response.data.errors;
            })

    };
    const handleInput = (e) => {
        setErrors({ ...errors, [e.target.name]: e.target.value });
    }

    let dt = new Date();

    const [today, setToday] = useState(
        dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
    );

    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('/api/report')
            .then(response => {
                // console.log(response.data);
                let arr = [];
                let i = 0;
                while (i < response.data.length) {
                    arr.push(createData(response.data[i].name, response.data[i].usagedata, response.data[i].amount, response.data[i].id));
                    i++;
                }
                setRows(arr);
            })
            .catch(error => {
                console.log(error);
                // errors: error.response.data.errors;
            })

    }, [open]);

    return (
        <>
            <Head />
            <div className="App">
                <Container maxWidth="lg">
                    <br />
                    <div style={{ height: '50px', textAlign: 'left' }}>
                        <button onClick={() => { setOpen(!open) }} style={{ padding: '10px', backgroundColor: 'green', color: 'white', textDecoration: 'none', marginBottom: '20px' }}>Create</button>
                    </div>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column, index) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column, index) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Container>
            </div>
            <Footer />
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                className={classes.modal}
            >
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <input
                        className={classes.area}
                        name="usagedata"
                        placeholder="Usage Date:YYYY-MM-DD"
                        required
                        type="text"
                        onChange={handleInput}
                    />
                    <input
                        className={classes.area}
                        name="name"
                        placeholder="Customer Name:"
                        required
                        type="text"
                        onChange={handleInput}
                    />
                    <input
                        className={classes.area}
                        name="address"
                        placeholder="Address:"
                        type="text"
                        required
                        onChange={handleInput}
                    />
                    <input
                        className={classes.area}
                        name="phone"
                        placeholder="Phone Number:"
                        type="text"
                        required
                        onChange={handleInput}
                    />
                    <input
                        className={classes.area}
                        name="email"
                        placeholder="Email:"
                        type="email"
                        required
                        onChange={handleInput}
                    />
                    <input
                        className={classes.area}
                        name="amount"
                        placeholder="Amount:"
                        type="text"
                        required
                        onChange={handleInput}
                    />
                    <input className={classes.submit} type="submit" value="Save" />
                </form>
            </Modal>
        </>
    );
}
export default Datas;
