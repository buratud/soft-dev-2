import "./WriteBlog.scoped.css";
import React from 'react';
import AddPost from "../component/AddPost";
import {Container} from 'reactstrap';
import Navbar from "../component/Nav";

const WriteBlog = () =>{
    return (
        <div className="writting">
            <Navbar/>
            <Container>
                <AddPost></AddPost>
            </Container>
        </div>
    );
};

export default WriteBlog;