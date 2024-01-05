import React from "react";
import { useParams } from "react-router-dom";

import Header from "./UserDetailPage/Header";
import Profile from "./UserDetailPage/Profile";
import Posts from "./UserDetailPage/Posts";

function UserDetail() {
  const { id } = useParams();
  return (
    <div className="UserDetail">
      <Header />
      <Profile />
      <Posts />
    </div>
  );
}

export default UserDetail;
