import './App.css'
import Auth from './pages/Auth'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './pages/Landing';
import Navbar from './components/common/Navbar';
import { useEffect } from 'react';
import { useDispatch } from "react-redux"; 
import { login } from "@store/authSlice";
import { authService } from "@services/index";

function App() { 

  const dispatch = useDispatch();
  useEffect(() => {
    const refresh = async () => {
      try {
        await authService.refresh(); 
        const res = await authService.me();
        if(res.status) {
          dispatch(login({...res.data}));
        }
      } catch (err) {
        console.log("Not logged in or refresh failed", err);
      }
    };
    refresh();
    //eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />}/> 
        <Route path="/login" element={<Auth />}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
