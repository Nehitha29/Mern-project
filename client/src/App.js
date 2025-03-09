import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { blogContext } from './contexts/blogs/BlogState';
import Create from './components/Create';
import Post from './components/Post';
import Edit from './components/Edit';
import Allposts from './components/Allposts';
import { AlertState } from './contexts/alerts/AlertState';
import Alert from './components/Alert';
import { useContext } from 'react';
import LoadingBar from 'react-top-loading-bar'

function App() {

  const {progress, setProgress} = useContext(blogContext)
  
  return (
    
      <AlertState>
    <Router>
      <Navbar/>
      <Alert/>
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Routes>
        <Route exact path='/' element = {<Home/>}/>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path="/create" element = {<Create/>}/>
        <Route exact path="/post/:id" element = {<Post/>}/>
        <Route exact path="/edit/:id" element = {<Edit/>}/>
        <Route exact path="/all" element = {<Allposts/>}/>
      </Routes>
    </Router>
    </AlertState>
    
  );
}

export default App;
