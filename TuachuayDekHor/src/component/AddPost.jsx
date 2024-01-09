import React, { useRef, useState, useContext } from 'react'
import { Card, CardBody, Form, Input, Label, Button, Container, FormGroup } from 'reactstrap'
import "./AddPost.scoped.css"
import JoditEditor from 'jodit-react';
import { General } from '../App';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
function AddPost() {
    const { supabase_for_use: supabase, session, user } = useContext(General);
    const navigate = useNavigate()

    const [loading,setLoading] = useState(false);

    const editor = useRef(null);
    // const [content, setContent] = useState('')

    const [post, setPost] = useState({
        title: '',
        content: '',
        category: '',
    })


    // fieldChanged function
    const fieldChanged = (event) => {

        // console.log(event)
        setPost({ ...post, [event.target.name]: event.target.value })

    }

    const contentFieldChanged = (data) => {

        setPost({ ...post, 'content': data })

    }

    // create post function
    const createPost = async(event) => {
        // console.log(user?.email)
        // console.log(post)
        event.preventDefault();
        setLoading(true);
        const file = event.target[0].files[0]
        const image_title =`${makeid(10)}.${file.type.replace(/(.*)\//g, '')}`
        const { error } = await supabase
        .storage
        .from('postthumnail')
        .upload(image_title, file, {
            cacheControl: '3600',
            upsert: false
        })
        if (error){
            setLoading(false)
            return alert(error)
        }
        
        const { data:{publicUrl:image_link} } = supabase
        .storage
        .from('postthumnail')
        .getPublicUrl(image_title)


        axios.post("http://localhost:3300/creatpost", {
            title: post.title,
            content: post.content,
            category: post.category,
            id: user?.id,
            image_title: image_title,
            image_link : image_link,
        })
        .then(data => {
            if(session){
                if (post.title.trim() != ''){
                    if (post.content.trim() != ''){
                        if (post.category != ''){
                            setLoading(false)
                            alert("post created")
                        }
                    }
                }
            navigate(`/profile/${user?.id}`);
            // `/profile/${username}`
            // user?.user_metadata_username
            }else{
                setLoading(false)
                alert("Please Login")
            }
        })
        .catch((err) => {
            setLoading(false)
            alert(err)
        })

        // console.log(post)
        if (post.title.trim() == '') {
            setLoading(false)
            alert('post is required!!')
            return;
        }
        if (post.content.trim() == '') {
            setLoading(false)
            alert('post content is required !!')
            return;
        }
        if (post.category == '') {
            setLoading(false)
            alert('select some category !!')
            return;
        }

        // submit the form 
        // createPost(post).then(data =>{
        //     alert("post created")
        // console.log(post)
        // }).catch((error)=>{
        //     alert('error')
        //     console.log(error)
        // })
    }

    return (
        <div className="wrapper">
            <Card>
                <CardBody>
                    {/* check */}
                    {/* {JSON.stringify(post)} */}
                    {/* <p>Let's make your blog</p> */}
                    <h1>Blogging</h1>
                        <Form onSubmit={createPost}>
                            
                            <div className="img_cover">
                                <Label for='imgCover'>Cover Photo</Label>
                                <Input
                                    type="file"
                                    id='Photo'
                                    className='rounded-2'
                                >
                                </Input>
                            </div>
                            <div className='title__head'>
                                <Label for='title'>Title</Label>
                                <Input
                                    type="text"
                                    id='title'
                                    placeholder='Type your title blog...'
                                    className='rounded-2'
                                    name="title"
                                    onChange={fieldChanged}
                                />
                            </div>

                            <div className='Catagory'>
                                <Label for='category'>Select Category</Label>
                                <Input
                                    type="select"
                                    id='Category'
                                    placeholder='Enter here'
                                    className='rounded-2'
                                    name='category'
                                    onChange={fieldChanged}
                                    defaultValue={0}
                                >
                                    <option disabled value={0}>--Select category--</option>
                                    <option>
                                        decoration
                                    </option>
                                    <option>
                                        cooking
                                    </option>
                                    <option>
                                        cleaning
                                    </option>
                                    <option>
                                        story
                                    </option>
                                </Input>
                            </div>
                            {/* <div className="choose">
                        <FormGroup>
                            <Label for="exampleFile">
                            Images
                            </Label>
                            <Input
                            id="exampleFile"
                            name="file"
                            type="file"
                            multiple
                            />
                        </FormGroup>
                    </div> */}

                            <div className='content__head'>
                                <Label for='content'>Content</Label>
                                <JoditEditor
                                    ref={editor}
                                    value={post.content}
                                    // config={config}
                                    // tabIndex={1} // tabIndex of textarea
                                    onChange={contentFieldChanged}
                                />
                                {/* <Input 
                        type="textarea" 
                        id='content'
                        placeholder='Type your content...'
                        className='rounded-2'
                        style={{height:'500px', marginLeft: '1rem', fontSize: '1rem', padding:'1rem'}}
                        /> */}
                            </div>

                            <Container className='button__Blog'>
                                <Button type='submit' className='Post-btn' disabled={loading} >Post</Button>
                                <Link to={"/home"}><Button type='button' className='Cancel' disabled={loading}>Cancel</Button></Link>
                            </Container>

                        </Form>

                </CardBody>

            </Card>

        </div>
    
    );
};

export default AddPost;