import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import axios from 'axios';

const Users = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);


    // 4.1
    const getData = () => {
        axios.get('/api/users').then(response => {
           return response.data;
        });
    }

    const handleDelete = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        axios.delete('/api/users/'+id);
        setItems(getData());
    }

    // check if user is authenticated and storing authentication data as states if true
    useEffect(() => {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            setIsLoggedIn(AppState.isLoggedIn);
            setUser(AppState.user);
        }
        setItems(getData());
    }, [items]);

    return (
        <div className="container">
            <Header userData={user} userIsLoggedIn={isLoggedIn} />
            <div className='row justify-content-center'>
                <div className='col-md-12'>

                    <br /><br />
                    <center><h1>User List</h1></center>
                    { ( items && items.length > 0 ) ?

                    <table className="table table-hovered table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {items.map((item,i)=>(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Link className='btn btn-info' to={`/users/${item.id}/edit`} >Edit</Link>
                                    <form onSubmit={handleDelete} >
                                        <input type="hidden" name="id" value={item.id}  />
                                        <button type="submit" className="btn btn-danger">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    :   <table className="table table-hovered table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="4"><center>No User!</center></td>
                                </tr>
                            </tbody>
                        </table> }
                </div>
            </div>
            <Footer />
        </div>
    )

}
export default Users
