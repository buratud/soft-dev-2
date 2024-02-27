import React, { useRef, useState, useContext ,useEffect } from 'react'
import { Card, CardBody, Form, Input, Label, Button, Container, FormGroup } from 'reactstrap'
import "./AddPost.scoped.css"
import JoditEditor from 'jodit-react';
import { AuthContext } from '../App';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { REACT_APP_BASE_API_URL , REACT_APP_MAIN_URL } from '../config';
const { createClient } = require("@supabase/supabase-js");
const {REACT_APP_SUPABASE_URL,REACT_APP_SUPABASE_ANON_KEY} = require("../config");
const supabase = createClient(REACT_APP_SUPABASE_URL , REACT_APP_SUPABASE_ANON_KEY);

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
function AddPost(params) {
    const blog_id = params.id;
    const navigate = useNavigate()
    const [userID,setUserID] = useState();

    const [loading,setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const editor = useRef(null);
    // const [content, setContent] = useState('')

    const [post, setPost] = useState({
        title: '',
        content: '',
        category: '',
        image: ''
    })


    // fieldChanged function
    const fieldChanged = (event) => {
        // console.log(event)
        setPost({ ...post, [event.target.name]: event.target.value })

    }

    const contentFieldChanged = (data) => {
        setPost({ ...post, 'content': data })
    }

    useEffect(() => {

        const getUserID = async() => {
            const {data,error} = await supabase.auth.getSession();
            const user = data?.session?.user;
            //console.log(user);
            if(user){
                setUserID(user.id);
            }
            else{
                window.location.href = `${REACT_APP_MAIN_URL}/login`;
            }
        }
        
        getUserID();
    },[]);

    const [data, setData] = useState([]);
    const edit = blog_id !== undefined;
    // const blog_id = 'bbb0f45f-5120-483a-849c-e95d24f21d89'
    useState (() => {
        console.log('edit',edit)
        if (edit) {
            axios.post(`${REACT_APP_BASE_API_URL}/detailpost`, {
                id: blog_id
            })
            .then(res => {
                setData(res.data[0]);
                console.log('blog detail',res.data[0])
                setSelectedImage(res.data[0].cover_img)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
    })

    useEffect(() => {
        if (data && edit) {
            setPost({
                title: data.title ?? '',
                content: data.body ?? '',
                category: data.category ?? ''
            });
        }
    }, [data]);

    // create post function
    const createPost = async(event) => {
        // console.log(user?.email)
        // console.log(post)
        event.preventDefault();
        setLoading(true);

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

        let img = data.cover_img ?? ''
        const file = event.target[0]?.files[0]
        console.log('file',file !== undefined)
        if (file !== undefined) {  
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

            img = image_link
        }
        
        if (img == '') {
            setLoading(false)
            alert('select some picture !!')
            return;
        }

        if (edit){
            axios.post(`${REACT_APP_BASE_API_URL}/editblog`, {
                blog: blog_id,
                title: post.title,
                category: post.category,
                body: post.content,
                cover_img: img
            })
            .then(res => {
                // setData(res.data[0]);
                console.log('editblog',res)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            axios.post(`${REACT_APP_BASE_API_URL}/createpost`, {
                title: post.title,
                content: post.content,
                category: post.category,
                user_id: userID,
                image_link : img,
            })
            .then(res => {
                setLoading(false)
                alert(res.data.message);
                navigate('/home')
            })
            .catch((err) => {
                setLoading(false)
                alert(err)
            })
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

    const [imageLoading, setImageLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setImageLoading(true); // Start the loading animation
          const reader = new FileReader();
          
          reader.onload = (event) => {
            setSelectedImage(event.target.result); // Set the preview image
            setImageLoading(false); // Stop the loading animation
          };
      
          reader.readAsDataURL(e.target.files[0]);
        }
      };
      
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
                                    onChange={handleImageChange}
                                >
                                </Input>
                                {imageLoading && <div className="image-loading"><div className="spinner"></div></div>}
                                {selectedImage && !imageLoading && <img src={selectedImage} alt="Cover" className="image-preview"/>}
                            </div>
                            <div className='title__head'>
                                <Label for='title'>Title</Label>
                                <Input
                                    type="text"
                                    id='title'
                                    placeholder='Type your title blog...'
                                    className='rounded-2'
                                    name="title"
                                    defaultValue={data?.title}
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
                                    defaultValue={data.category ?? 0}
                                >
                                    <option disabled value={0}>-- Select category --</option>
                                    <option value={1} selected={data.category === 1}>
                                        cooking
                                    </option>
                                    <option value={2} selected={data.category === 2}>
                                        decoration
                                    </option>
                                    <option value={3} selected={data.category === 3}>
                                        cleaning
                                    </option>
                                    <option value={4} selected={data.category === 4}>
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
                                    value={data.body ?? post.content}
                                    // config={config}
                                    // tabIndex={1} // tabIndex of textarea
                                    // Cursor moves to beginning of document after typing pls help me co-pilot
                                    onBlur={newContent => contentFieldChanged(newContent)}
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