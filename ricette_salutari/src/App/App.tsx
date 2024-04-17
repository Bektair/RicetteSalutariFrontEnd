import './App.css';
import React, { useState } from 'react';
import Note from '../Note/Note';
import Card from '../Card/Card';
import { BrowserRouter, Routes, Route, Navigation, redirect, Navigate } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Home from '../Home/Home';
import NotFound from '../Auth/NotFound';
import ProtectedRoute from '../Routing/ProtectedRoute';
import RecipePicker from '../IngredientPicker/RecipePicker';

//Passing down props to all the children of the provider
export const ThemeContext = React.createContext('true')

export default function App() {
  const[darkTheme, setDarkTheme] = useState(true)

  function toggleTheme(){
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  function Logout(){
    localStorage.clear()
    return <Navigate to= "/login"></Navigate>
  }

  function RegisterAndLogout(){
    localStorage.clear()
    return <Register/>
  }

  return (
     <BrowserRouter>
       <Routes>
         <Route
           path="/"
           element={
             <ProtectedRoute>
               <Home/>
             </ProtectedRoute>
           }
         />
         <Route path="/login" element={<Login />}/>
         <Route path="/logout" element={<Logout />}/>
         <Route path="/register" element={<RegisterAndLogout />}/>
         <Route path="*" element={<NotFound/>}/>
         <Route path="/recipe_picker"
           element={
             <ProtectedRoute>
               <RecipePicker/>
             </ProtectedRoute>
           }
         />
       </Routes>
     </BrowserRouter>
  );
}

/*
 <ThemeContext.Provider value={String(darkTheme)}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Card>
        <Note></Note>
      </Card>
      </ThemeContext.Provider>
*/