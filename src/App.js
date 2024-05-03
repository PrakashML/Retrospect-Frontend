import './App.css';
import Registration from './Component/Registration';
import Login from './Component/Login';
// import Header from './Component/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ChatRoom from './Component/ChatRoom';
import CreateRoom from './Component/CreateRoom';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/registration' element = {<Registration/>}/>
      <Route path='/chatroom/:roomId' element = {<ChatRoom roomName="General Chat"/>}/>
      <Route path='/dashboard/:userId/:userRole' element={<Dashboard />} />
      <Route path='/createroom' element={<CreateRoom/>}/>
      </Routes>
    </div>
    </BrowserRouter> 
  );
}

export default App;
