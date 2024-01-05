// import '../App.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router  } from "react-router-dom";

import UserDirectory from './UserDirectory';
import UserDetail from './UserDetail';

function Home() {
  return (
    <div id="Home-Container">
        <Router>
          <Routes>
            <Route path="/user/:id" Component={UserDetail}/>
            <Route path="/" Component={UserDirectory}/>
          </Routes>
        </Router>
      </div>
  );
}

export default Home;
