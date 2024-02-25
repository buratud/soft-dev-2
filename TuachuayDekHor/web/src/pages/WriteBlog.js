import "./WriteBlog.scoped.css";
import React from 'react';
import AddPost from "../component/AddPost";
import {Container} from 'reactstrap';
import Navbar from "../component/Nav";

const WriteBlog = ({params}) =>{
    return (
        <div className="writting">
            <Navbar/>
            <Container>
                <AddPost params = {params}/>
            </Container>
        </div>
    );
};

export default WriteBlog;