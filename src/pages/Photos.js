import { Navigation } from '../../src/App';
import { useState,useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function Photos() {
  const { albumNum } = useParams(); 

  return (
   <>
   <h3>Album No` {albumNum}</h3>
   <div>
   </div>
   <Outlet/>
   </>
  );
}

export default Photos;
