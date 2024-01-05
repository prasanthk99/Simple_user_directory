import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/UserDirectory.css';

function UserDirectory() {
    // const users = [{id:1,name:"prasanth",posts:10},{id:2,name:"Kumar",posts:20}]
    const [users,setUsers] = useState([]);
    const [postcount,setPostcount] = useState({});

    async function getUsers() {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          setUsers(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    };
    async function getPostCount(){
        try {
            const promises = users.map(async (user) => {
                const userId = user.id;
                try {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                    return { userId: userId, postCount: response.data.length };
                } catch (error) {
                    console.log(error); // Handle error for individual request
                    return { userId: userId, postCount: 0 }; // Assuming 0 posts on error
                }
            });
    
            const resolvedPromises = await Promise.all(promises);
            const postCounts = resolvedPromises.reduce((acc, val) => {
                acc[val.userId] = val.postCount;
                return acc;
            }, {});
            
            setPostcount(postCounts);
        } catch (error) {
            console.error(error);
        }
    }

    const navigate = useNavigate();
    const userCardClick = (userId)=>{
        console.log(userId);
        navigate(`user/${userId}`);
    }
    
    useEffect(()=>{
        getUsers();
    },[]);
    useEffect(()=>{
        getPostCount();
    },[users]);

    return (
        <div className="UserDirectory">
        <h2>Directory</h2>
        <div className='users'>
            {users.map((user)=>
                <div className={'user-title user-'+user.id} key={user.id} onClick={()=>userCardClick(user.id)}>
                    <p>Name : {user.name}</p>
                    <p>Posts : {postcount[user.id]}</p>
                </div>
            )}
        </div>
        </div>
    );
}

export default UserDirectory;
