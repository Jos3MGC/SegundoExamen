import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './Consume.css';

const API_HOST = "https://jsonplaceholder.typicode.com";
const POST_API_URL = `${API_HOST}/posts`;

function Prueba() {
    const [data, setData] = useState([]);

    const fetchPost = () => {
        fetch(`${POST_API_URL}`)
            .then(res => res.json())
            .then(json => setData(json));
            console.table(data);
    }

    return (
        <div className="container">
            <button  className='centrado' onClick={() => fetchPost()}>Informacion</button>
            <h1>TABLA 1</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Prueba;