import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login  from "./components/Login"
import { Profile } from "./components/Profile"
import { Body } from "./components/Body"
import { Provider } from "react-redux"
import appStroe from "./utilis/appStore"
import Feed from "./components/Feed"
import Connection from "./components/Connection"
import Request  from "./components/Request"
import Preuimum  from "./components/Preuimum"
import Chat from "./components/Chat"

function App() {
 
  return (
    <>
    <Provider store={appStroe}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
       <Route path="/feed" element={<Feed/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
       <Route path="/connections" element={<Connection/>}/>
        <Route path="/requests" element={<Request/>}/>
         <Route path="/premium" element={<Preuimum/>}/>
         <Route path="/chat/:targetUserId" element={<Chat/>}/>


      </Route>
    </Routes>

    </BrowserRouter>
    </Provider>
   
    </>
  )
}

export default App
