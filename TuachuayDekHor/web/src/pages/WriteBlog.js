import "./WriteBlog.scoped.css";
import React from 'react';
import AddPost from "../component/AddPost";
import {Container} from 'reactstrap';
import Navbar from "../component/Nav";
import { useParams } from 'react-router-dom';

const WriteBlog = () =>{
    const { id } = useParams();
    return (
        <div className="writting">
            <Navbar/>
            <Container>
                <AddPost id = {id}/>
            </Container>
        </div>
    );
};

export default WriteBlog;