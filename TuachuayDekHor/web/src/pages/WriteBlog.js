import "./WriteBlog.scoped.css";
import React from 'react';
import AddPost from "../component/AddPost";
import {Container} from 'reactstrap';
import Navbar from "../component/Nav";
import { useParams } from 'react-router-dom';
import Footer from "../component/footer";

const WriteBlog = () =>{
    const { id } = useParams();
    return (
        <div className="writting">
            <Navbar/>
            <Container>
                <AddPost id = {id}/>
            </Container>
            <div className="footer">
               <Footer/> 
            </div>
        </div>
        
    );
};

export default WriteBlog;