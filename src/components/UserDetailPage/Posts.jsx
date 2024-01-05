// import './App.css';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import '../../styles/UserPosts.css';

function Posts() {
  const { id } = useParams();

  const [userposts,setUserposts] = useState([]);

  const getUserPosts = async ()=>{
    await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then(function (response) {
        // handle success
        setUserposts(response.data);
        // console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
  }

  useEffect(()=>{
    getUserPosts();
  },[id]);

  return (
    <>
      <h3>Posts</h3>
      <div className="UserDetail-posts">
        {userposts.map((post)=>
          <div style={{ width: '30rem' }} className="userPost-card" key={post.id}>
            <h3>{post.title}</h3>
            <p>
                {post.body}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Posts;
