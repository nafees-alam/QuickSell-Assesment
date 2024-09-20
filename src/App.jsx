import React, { useEffect } from 'react'
import './App.css';
import DashBoard from './Components/DashBoard/Dashboard';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTickets } from './api/data.js';
import Loading from './Components/Loading/Loading';
import NavBar from './Components/Navbar/Navbar';
const App = () => {
  const dispatch = useDispatch();
  const { allTickets } = useSelector(state => state.DataReducer);
  useEffect(() => {
    dispatch(fetchAllTickets());
    console.log(allTickets);
    
  }, [dispatch])
  return allTickets ? (
    <div style={{ paddingTop: "10px" }} >
      <NavBar />
      <hr style={{ marginTop: "10px" }} />
      <DashBoard />
    </div>
  ) : <Loading />
}
export default App
