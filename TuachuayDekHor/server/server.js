const express = require('express');
const cors = require('cors');
// const mysql = require('mysql');
const { createClient } = require('@supabase/supabase-js');
require("dotenv").config();
const Sentry = require("@sentry/node");
const { BASE_SERVER_PATH, PORT, SUPABASE_URL, SUPABASE_KEY } = require('./config');
const { configDotenv } = require('dotenv');

const app = express();
const api = express.Router();

Sentry.init({
    dsn: "https://549167be6df0037f9474e32e648b9579@o4507243238195200.ingest.de.sentry.io/4508396765053008",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Sentry.Integrations.Express({ app }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());

app.use(BASE_SERVER_PATH, api);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

//MySQL Connection
// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'mydb'
// })

// connection.connect((err) => {
//     if (err){
//         console.log('Error connecting to MySQL database = ',err)
//         return;
//     }
//     console.log('MySQL succesfully connected!');
// })

////////////////////////////////////Register/////////////////////////////////////////////////

//signup
api.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username,
            }
        }
    });
    // await supabase.from("profile_user").insert({username:username});
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json(data);
    }
});

api.get("/getprofile/:id", async (req, res) => {
    const { id } = req.params
    const { data: { user }, error } = await supabase.auth.admin.getUserById(id)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json({
            email: user.email,
            user_metadata: user.user_metadata
        });
    }
})

//-----------------------------Profile-----------------------------------

api.post('/profile-picture', async (req, res) => {
    const { userID } = req.body;
    if (userID) {
        const { data } = await supabase
            .from("users")
            .select("picture, role")
            .eq("id", userID)
            .single();
        res.status(200).json({ data });
    }
})


//edit_profile
api.post("/edit_profile", async (req, res) => {
    const { username, email, id, avatar_url } = req.body;
    const { data: user, error } = await supabase.auth.admin.updateUserById(
        id,
        { user_metadata: { username: username, avatar_url: avatar_url } }
    )
    const { ERROR } = await supabase
        .from("profile_user")
        .update({ username: username, avatar_url: avatar_url })
        .eq("email", email)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json(user);
    }
})

//createpost
api.post("/createpost", async (req, res) => {
    const { title, category, image_link, user_id, content } = req.body;
    // const { data } = await supabase.from("blog_category").select("id").eq("category", category);
    // if (data) {
        const { data, error } = await supabase.from("blog").insert({ title: title, category, body: content, cover_img: image_link, blogger: user_id })
        .select('*,blog_category(category)')
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json({ message: 'Create Post Success', notError: true, data: data });
        }
    // }
})

//edit blog
api.post("/editblog", async (req, res) => {
    const { blog, title, category, body, cover_img } = req.body
    const { data, error } = await supabase
        .from('blog')
        .update({
            'title': title,
            'category': category,
            'body': body,
            'cover_img': cover_img
        })
        .eq('blog_id', blog)
        .select('*,blog_category(category)')
    if (error) {
        console.error(error);
        res.status(400).json(error);
    } else {
        res.status(200).json(data);
    }
});

//delete
api.delete("/deletepost", async (req, res) => {
    const { id_post } = req.query;
    const { error } = await supabase
        .from("blog")
        .delete()
        .eq('blog_id', blog)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json({ msg: "success" })
    }
})

api.post("/deleteblog", async (req, res) => {
    const { blog } = req.body;
    console.log(blog)
    const { error } = await supabase
        .from("blog")
        .delete()
        .eq('blog_id', blog)

    const { error : commentDeletionErr } = await supabase
        .from("comments")
        .delete()
        .eq('blog_id', blog)

    const { error : likeDeletionErr } = await supabase
        .from("like_blog")
        .delete()
        .eq('blog_id', blog)
    if (error || commentDeletionErr || likeDeletionErr) {
        res.status(500).json({error , commentDeletionErr , likeDeletionErr});
    }
    else {
        res.status(200).json({ msg: "success" })
    }
})

//like_post
api.post("/likepost", async (req, res) => {
    const { id_post, id } = req.body;
    const { data, error } = await supabase.from("likes").insert({ id_post: id_post, id: id })
    if (error) {
        res.status(500).json(error);
    }
    else {
        console.log(data);
        res.status(200).json(data);
    }
})

//count_like
api.post("/countlike", async (req, res) => {
    const { id } = req.body;
    const { data, error } = await supabase
        .from("blog")
        .select('likes')
        .eq("blog_id", id)
    if (error) {
        res.status(500).json(error);
    }
    else {
        // console.log(data.length);
        res.status(200).json(data);
    }
})

api.post("/updateLike", async (req, res) => {
    const { blog_id } = req.body;
    const { data: { likes: like }, error: likeError } = await supabase.from('blog').select('likes').eq('blog_id', blog_id).single();
    console.log(like);
    if (likeError) {
        console.log(likeError);
        res.status(400).json({ success: false });
        return;
    }
    res.status(200).json({ success: true });




})

//comment
api.post("/commentpost", async (req, res) => {
    const { user_id, blog_id, comment } = req.body;
    const { data, error } = await supabase.from("comments").insert({ user_id, blog_id, content: comment });
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json(data);
    }
})

//show_comment
api.post("/showcomment", async (req, res) => {
    try {
        const { blog_id } = req.body;
        const { data, error } = await supabase.from("comments").select('*').eq("blog_id", blog_id);

        for (let post of data) {
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('username')
                .eq('id', post.user_id)
                .single();

            if (userError) {
                console.log(userError);
            }

            post.user = userData; // Add user information to each blog post
        }
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json(data);
        }
    } catch (userError) {
        console.error("Error fetching user data:", userError);
        // Handle user data fetch error here
    }
})

api.post("/deletecomment", async (req, res) => {
    const { comment } = req.body;
    const { error } = await supabase
        .from("comments")
        .delete()
        .eq('comment_id', comment)
    if (error) {
        res.status(500).json(error);
    }
    else {
        res.status(200).json({ msg: "success" })
    }
})

//randompost
api.post("/randompost", async (req, res) => {
    const { data, error } = await supabase
        .from('updaterandom') // Replace with your table name
        .select('id_post,title,category,user:profiles!Create_Post_id_fkey(username),image_link')
        // .order('random()') // This orders the rows randomly
        .limit(6); // Adjust the limit as needed
    if (error) {
        console.error('Error fetching random rows:', error);
    } else {
        res.status(200).json(data);
        // console.log('Random rows:', data);
        // Do something with the random rows
    }
})

api.post("/preview-blog", async (req, res) => {
    const { amount } = req.body || 6;
    try {
        const { data, error } = await supabase.from('blog').select('*')
            .order('likes', { ascending: false })
            .order('date', { ascending: true })
            .limit(amount);



        for (let post of data) {
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('username')
                .eq('id', post.blogger)
                .single();

            const { data: categoryData, error: categoryError } = await supabase
                .from('blog_category')
                .select('category')
                .eq('id', post.category)
                .single();

            if (userError || categoryError) {
                console.log(userError);
                console.log(categoryError);
            }

            post.user = userData; // Add user information to each blog post
            post.category = categoryData?.category;
        }

        if (error) {
            console.log(error);
            res.status(200).json({ success: false });
        } else {
            res.status(200).json({ data, success: true });
        }

    } catch (userError) {
        console.error("Error fetching user data:", userError);
        // Handle user data fetch error here
    }

})

api.post('/get-blog', async (req, res) => {
    const { category } = req.body;
    const { data: { id: category_id }, error: category_id_error } = await supabase.from('blog_category').select('id').eq('category', category).single();

    const { data, error: blog_error } = await supabase
        .from('blog')
        .select('*')
        .eq('category', category_id)
        .order('likes', { ascending: false })
        .order('date', { ascending: true });

    for (let post of data) {
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('username')
            .eq('id', post.blogger)
            .single();

        if (userError) {
            console.log(userError);
        }

        post.user = userData;
    }

    if (category_id_error || blog_error) {
        console.log(category_id_error);
        console.log(blog_error);
        res.status(400).json({ success: false });
    } else {
        res.status(200).json({ success: true, data });
    }
})


//show_like
api.get("/showlike", async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase
        .from('likes')
        .select('id_post,title:Create_Post(title),user:profiles!likes_id_fkey(username),category:Create_Post(category),image:Create_Post(image_link)').eq("id", id)
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
})

api.post("/isliked", async (req, res) => {
    const { user, blog } = req.body;
    const { data, error } = await supabase
        .from('like_blog')
        .select('*')
        .eq("user_id", user)
        .eq("blog_id", blog)
    if (error) {
        console.log(error)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data.length !== 0); //true = ไลค์แล้ว false = ยังไม่ไลค์
    }
})

api.post("/like", async (req, res) => {
    const { user, blog } = req.body;
    const { data, error } = await supabase
        .from('like_blog')
        .insert([
            { user_id: user, blog_id: blog },
        ])
        .select()

    const { data: likeData } = await supabase.from('like_blog').select('*').eq('blog_id', blog);
    const likes = likeData?.length || 0;
    if (error) {
        console.log(error)
        res.status(400).json({ success: false });
    }
    else {
        const { error: err } = await supabase.from('blog').update({ likes }).eq('blog_id', blog);
        if (err) {
            console.log(err);
            res.status(400).json({ success: false });
        }
        res.status(200).json({ likes, success: true });
    }
})

api.post("/unlike", async (req, res) => {
    const { user, blog } = req.body;
    // console.log('user, blog', user, blog)
    const { error } = await supabase
        .from('like_blog')
        .delete()
        .eq('user_id', user)
        .eq('blog_id', blog)

    const { data: likeData } = await supabase.from('like_blog').select('*').eq('blog_id', blog);
    const likes = likeData?.length || 0;
    if (error) {
        console.log(error)
        res.status(400).json({ success: false });
    }
    else {
        const { error: err } = await supabase.from('blog').update({ likes }).eq('blog_id', blog);
        if (err) {
            console.log(err);
            res.status(400).json({ success: false });
        }
        res.status(200).json({ likes, success: true });
    }
})

//post_to_profile
api.get("/posttoprofile", async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase.from("Create_Post").select('id_post,title,category,user:profiles!Create_Post_id_fkey(username),image_link').eq("id", id)
    if (error) {
        console.log(error)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
})

//post_to_category
api.get("/posttocategory", async (req, res) => {
    const { category } = req.query;
    const { data, error } = await supabase.from("Create_Post").select('id_post,title,user:profiles!Create_Post_id_fkey(username),image_link').eq("category", category)
    if (error) {
        console.log(error)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
})

//detailpost
api.post("/detailpost", async (req, res) => {
    const { id } = req.body;
    const { data, error } = await supabase.from("blog").select('*,blog_category(category)').eq("blog_id", id);
    if (error) {
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
})
//name_profile
api.get("/nameprofile", async (req, res) => {
    const { id } = req.query;
    const { data, error } = await supabase.from("Create_Post").select('id,user:profiles!Create_Post_id_fkey(username)').eq("id", id);
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
})

//id_to_pic
api.post("/idtopic", async (req, res) => {
    const { id } = req.body;
    const { data, error } = await supabase.from("users").select('picture , username').eq("id", id);
    if (error) {
        console.log(data)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
})

//blogger
api.post("/blogger", async (req, res) => {
    const { data, error } = await supabase.from('blog').select('blogger');
    const uniqueBloggerIds = [...new Set(data.map(item => item.blogger))];
    const formattedBloggers = uniqueBloggerIds.map(bloggerId => ({ blogger: bloggerId }));

    for (let post of formattedBloggers) {
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('username')
            .eq('id', post.blogger)
            .single();

        const { data: imgData, error: imgError } = await supabase
            .from('users')
            .select('picture')
            .eq('id', post.blogger)
            .single();

        if (userError || imgError) {
            console.log(userError);
            console.log(imgError);
        }
        post.user = userData;
        post.image = imgData;
    }

    if (error) {
        console.log(error);
        res.status(200).json({ success: false });
    } else {
        res.status(200).json({ data: formattedBloggers, success: true });
    }

});

api.post("/bloggerlist", async (req, res) => {
    try {
        const { data, error } = await supabase
            .rpc('get_blogger')

        if (error) {
            console.error(error);
            res.status(400).json(error);
        } else {
            const distinctBloggers = [...new Set(data.map(entry => entry))];
            res.status(200).json(distinctBloggers);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//search
api.post("/search", async (req, res) => {
    // const {id} = req.query;
    const { data, error } = await supabase
        .from("blog")
        .select('*,blog_category(category),users(username)')
    if (error) {
        console.log(error)
        res.status(400).json(error);
    }
    else {
        res.status(200).json(data);
    }
})

//login
// api.post("/login",async (req,res) => {
//     const{email,password} = req.body;
//     const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password
//     });
//     if (error){
//         res.status(400).json(err.sqlMessage);
//     }
//     else{
//         res.status(200).json(data)
//     }
// });

// const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
// connection.query(sql,[req.body.email,req.body.password],(err,data) =>{
//     // console.log(data);
//     if (err) {
//         return res.status(400).json(err.sqlMessage);
//     }
//     if (data.length > 0){
//         return res.status(200).json({status:'complete_login',msg: "Success to login"});
//     } else{
//         return res.status(400).json({status: 'not login',msg:"Faile to login"});
//     }
// })


//forgot_password
api.get("/forgot_password", async (req, res) => {
    // const sql = "SELECT * FROM users WHERE email = ?"
    // const email = req.body.email
    // connection.query(sql,[email],(err,data) =>{
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (data.length > 0){
    //         return res.status(200).json("There is an email ");
    //     }
    //     return res.status(400).json("This email doesn't exist!");
    // })
})

//reset_password
api.patch("/reset_password", async (req, res) => {
    // const sql = "UPDATE users SET password = ? WHERE email = ?"
    // const {email,newpassword,confirmpassword} = req.body;
    // connection.query(sql,[newpassword,email,confirmpassword],(err,data) =>{
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (newpassword == confirmpassword){
    //         return res.status(200).json("Succes to update your new password!");
    //     }
    //     return res.status(400).json("password must be the same");
    // })
})
//profile
api.get("/profile", async (req, res) => {
    // const sql = "SELECT username, avatar FROM users";
    // connection.query(sql,(err,data) =>{
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     return res.status(200).json({status: "myprofile",data})
    // })
})


////////////////////////////////////////////writeblog/////////////////////////////////////////////////////////

//cleaning
api.post("/writeblog/cleaning", async (req, res) => {
    // const sql1 = "SELECT * FROM users WHERE id = ? ";
    // const sql2 = "INSERT INTO cleaning(id,title_name,image_title,content) VALUES (?, ?, ?, ?)";
    // const {id,title_name,image_title,content} = req.body;
    // connection.query(sql1,[id],(err,data) => {
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (data[0].id == id){
    //         connection.query(sql2,[id,title_name,image_title,content],(err,data) => {
    //             if(err) {
    //                 return res.status(400).json(err.sqlMessage);
    //             }
    //             return res.status(200).json("Your blog will be posted");
    //         })
    //     }
    //     else{
    //         return res.status(400).json({status: "fail" ,msg:"You should login before write the blog!"});
    //     }
    // })
})

//decoration
api.post("/writeblog/decoration", async (req, res) => {
    // const sql1 = "SELECT * FROM users WHERE id = ? ";
    // const sql2 = "INSERT INTO decoration(id,title_name,image_title,content) VALUES (?, ?, ?, ?)";
    // const {id,title_name,image_title,content} = req.body;
    // connection.query(sql1,[id],(err,data) => {
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (data[0].id == id){
    //         connection.query(sql2,[id,title_name,image_title,content],(err,data) => {
    //             if(err) {
    //                 return res.status(400).json(err.sqlMessage);
    //             }
    //             return res.status(200).json("Your blog will be posted");
    //         })
    //     }
    //     else{
    //         return res.status(400).json({status: "fail" ,msg:"You should login before write the blog!"});
    //     }
    // })
})

//food
api.post("/writeblog/food", async (req, res) => {
    // const sql1 = "SELECT * FROM users WHERE id = ? ";
    // const sql2 = "INSERT INTO food(id,title_name,image_title,content) VALUES (?, ?, ?, ?)";
    // const {id,title_name,image_title,content} = req.body;
    // connection.query(sql1,[id],(err,data) => {
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (data[0].id == id){
    //         connection.query(sql2,[id,title_name,image_title,content],(err,data) => {
    //             if(err) {
    //                 return res.status(400).json(err.sqlMessage);
    //             }
    //             return res.status(200).json("Your blog will be posted");
    //         })
    //     }
    //     else{
    //         return res.status(400).json({status: "fail" ,msg:"You should login before write the blog!"});
    //     }
    // })
})

//dekhor_story
api.post("/writeblog/dekhor_story", async (req, res) => {
    // const sql1 = "SELECT * FROM users WHERE id = ? ";
    // const sql2 = "INSERT INTO dekhor_story(id,title_name,image_title,content) VALUES (?, ?, ?, ?)";
    // const {id,title_name,image_title,content} = req.body;
    // connection.query(sql1,[id],(err,data) => {
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (data[0].id == id){
    //         connection.query(sql2,[id,title_name,image_title,content],(err,data) => {
    //             if(err) {
    //                 return res.status(400).json(err.sqlMessage);
    //             }
    //             return res.status(200).json("Your blog will be posted");
    //         })
    //     }
    //     else{
    //         return res.status(400).json({status: "fail" ,msg:"You should login before write the blog!"});
    //     }
    // })
})


//////////////////////////////////////edit your blog////////////////////////////////////////////

//cleaning
api.patch("/writeblog/edited_cleaning", async (req, res) => {
    // const sql1 = "SELECT * FROM users WHERE id = ? ";
    // const sql2 = "UPDATE cleaning SET title_name = ? , image_title = ? , content = ? WHERE id_cleaning = ?";
    // const {id,id_cleaning,title_name,image_title,content} = req.body;
    // connection.query(sql1,[id],(err,data) => {
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (data[0].id == id){
    //         connection.query(sql2,[title_name,image_title,content,id_cleaning],(err,data) =>{
    //             if (err) {
    //                 return res.status(400).json(err.sqlMessage);
    //             }
    //             if (data.length != 0){
    //                 return res.status(200).json("Success to edited your blog");
    //             }
    //             return res.status(400).json("Fail to edited your blog");
    //         })
    //     }
    //     else{
    //         return res.status(400).json({status: "fail" ,msg:"You haven't an account"});
    //     }
    // })
})

//decoration
api.patch("/writeblog/edited_decoration", async (req, res) => {
    // const sql1 = "SELECT * FROM users WHERE id = ? ";
    // const sql2 = "UPDATE decoration SET title_name = ? , image_title = ? , content = ? WHERE id_decoration = ?";
    // const {id,id_decoration,title_name,image_title,content} = req.body;
    // connection.query(sql1,[id],(err,data) => {
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (data[0].id == id){
    //         connection.query(sql2,[title_name,image_title,content,id_decoration],(err,data) =>{
    //             if (err) {
    //                 return res.status(400).json(err.sqlMessage);
    //             }
    //             if (data.length != 0){
    //                 return res.status(200).json("Success to edited your blog");
    //             }
    //             return res.status(400).json("Fail to edited your blog");
    //         })
    //     }
    //     else{
    //         return res.status(400).json({status: "fail" ,msg:"You haven't an account"});
    //     }
    // })
})

//food
api.patch("/writeblog/edited_food", async (req, res) => {
    // const sql1 = "SELECT * FROM users WHERE id = ? ";
    // const sql2 = "UPDATE food JOIN users ON food.id = users.id SET title_name = ? , image_title = ? , content = ?  WHERE id_food = ?";
    // const {id,id_food,title_name,image_title,content} = req.body;
    // connection.query(sql1,[id],(err,data) => {
    //     if (err) {
    //         return res.status(400).json(err.sqlMessage);
    //     }
    //     if (data[0].id == id){
    //         connection.query(sql2,[title_name,image_title,content,id_food],(err,data) =>{
    //             if (err) {
    //                 return res.status(400).json(err.sqlMessage);
    //             }
    //             if (data.length != 0){
    //                 return res.status(200).json("Success to edited your blog");
    //             }
    //             return res.status(400).json("Fail to edited your blog");
    //         })
    //     }
    //     else{
    //         return res.status(400).json({status: "fail" ,msg:"You haven't an account"});
    //     }
    // })
})


//yourblog
api.get("/", (req, res) => {
    res.send("Hello World");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));