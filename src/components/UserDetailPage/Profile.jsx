import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import '../../styles/UserProfile.css';

function Profile() {
  const { id } = useParams();
  const [users,setUsers] = useState([]);
  const [filtereduser,setFilterdUser] = useState({});
  
  const getUserDetails = async ()=>{
    // const userId = user.id;
    await axios.get('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
        // handle success
        // console.log(response.data);
        setUsers(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
  }
  useEffect(()=>{
    getUserDetails();
  },[]);

  useEffect(()=>{
      const filterData = users.filter((u)=>u.id==id)
      const data = filterData['0'];
      console.log(data);
      setFilterdUser((filterData)=>({...filterData,...data}));
      // console.log(filtereduser)
  },[users])
  

  return (
    <>
      <h3>Profile Page</h3>
      <div className="UserDetail-profile">
        <div>
          <p><b>Name : </b>{filtereduser.name}</p>
          <p><b>Username | Catch phrase :</b> {filtereduser.username} | {(filtereduser.address)?filtereduser.company.catchPhrase:"catchPhrase Not Found"}</p>
        </div>
        <div>
          <p><b>Address :</b>{
            filtereduser.address ? (
              <div>
                  <span>{filtereduser.address.suite},</span>
                  <span> {filtereduser.address.street},</span>
                  <span> {filtereduser.address.city},</span>
                  <span> {filtereduser.address.zipcode},</span>
              </div>
            ) : (
                <div>No Address Found</div>
            )
          }
          </p>
          <p><b>Email | Phone :</b> {filtereduser.email} | {filtereduser.phone}</p>
        </div>  
      </div>
    </>
  );
}

export default Profile;
