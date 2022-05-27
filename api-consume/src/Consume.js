import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Box from '@mui/material/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Consume.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const API_HOST = "https://jsonplaceholder.typicode.com";
const POST_API_URL = `${API_HOST}/posts`;
const POST_API_PHOTOS = `${API_HOST}/photos`;

const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'body', label: 'Body', minWidth: 100 },
];

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function Prueba() {
    const [itemdata, setData] = useState([]);
    const [photo, setPhoto] = useState([]);
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

    const fetchPost = () => {
        fetch(`${POST_API_URL}`)
            .then(res => res.json())
            .then(json => setData(json));
    }
    const rows = itemdata;

    const fetchPhotos = () => {
        fetch(`${POST_API_PHOTOS}`)
            .then(res => res.json())
            .then(json => setPhoto(json));
    }

    const dataPhoto = photo;

    return (
        <div className="container">
            <div className={classes.root}>
                <Box textAlign= 'center'>
                    <br />
                    <Button variant="outlined" color="primary" onClick={() => fetchPost()}>Información Post</Button>
                </Box>
            </div>
            <container>
            <br />
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </StyledTableRow >
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </container>
            <div className={classes.root}>
                <br />
                <Box textAlign= 'center'>
                    <br />
                    <Button variant="outlined" color="primary" onClick={() => fetchPhotos()}>Información fotos</Button>
                </Box>
            </div>
            <container>
            <br />
                <Row md={3}>
                    {
                        dataPhoto.map((item) => (
                            <Col key={item.id}>
                                <Card border="primary" style={{ width: '18rem' }}>
                                <Card.Header>{`${item.id}`}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{`${item.title}`}</Card.Title>
                                        <Card.Img variant="top" src={`${item.url}`} />
                                        <Card.Img variant="top" src={`${item.thumbnailUrl}`} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </container>
        </div >
    );
}

export default Prueba;