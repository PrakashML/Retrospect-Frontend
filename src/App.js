import './App.css';
import Registration from './Component/Registration';
import Login from './Component/Login';
// import Header from './Component/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ChatRoom from './Component/ChatRoom';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/registration' element = {<Registration/>}/>
      <Route path='/chatroom' element = {<ChatRoom roomName="General Chat"/>}/>
      </Routes>
    </div>
    </BrowserRouter> 
    // <ChatRoom roomName="General"/>
  );
}

export default App;
