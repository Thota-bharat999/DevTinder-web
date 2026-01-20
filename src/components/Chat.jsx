import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { createScoketConnection } from '../utilis/socket'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utilis/constants'

const Chat = () => {
    const {targetUserId}=useParams()
    const socketRef=useRef(null)
      const [messages,setMessages]=useState([])
      const [newMessage,setNewMessage]=useState("")
    const user=useSelector(store=>store.user)
    const userId=user?._id

const fecthChatMessage=async()=>{
    const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{
        withCredentials:true,
    })
    console.log(chat.data.messages)
    const chatMessage=chat?.data?.messages.map((msg)=>{
        const {firstName,lastName,_id}=msg?.senderId
        return {
            firstName,
            lastName,
            text:msg.text,
            senderId:_id,

        };
    });
    setMessages(chatMessage)

}
useEffect(()=>{
fecthChatMessage()
},[])


    useEffect(()=>{
        if(!userId) return
        const socket=createScoketConnection()
        socketRef.current=socket
        socket.emit("joinChat",{firstName:user.firstName,lastName:user.lastName,userId,targetUserId})
        socket.on("messageRecived",({firstName,lastName,text,senderId})=>{
            console.log(firstName + " : " + text)
            setMessages((messages)=>[...messages,{firstName,lastName,text,senderId}])
        })
        return ()=>{
            socket.disconnect()
        }

    },[userId,targetUserId])
    const sendMessage=()=>{
        if(!socketRef.current) return
        socketRef.current.emit("sendMessage",{
            firstName:user.firstName,
            lastName:user.lastName,
            userId,
            targetUserId,
            text:newMessage,
        });
         setNewMessage("")
    }
   
  
  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
        <h1 className='p-5 border-b border-gray-600'>Chat</h1>
        <div className='flex-1 overflow-scroll p-5'>
        {Array.isArray(messages) ? messages.map((msg,index)=>{
            return ( 
                   
                   <div
            className={`chat ${
              userId === msg.senderId ? "chat-end" : "chat-start"
            }`}
            key={index}
          >
                 
  <div className="chat-header">
    {`${msg.firstName} ${msg.lastName}`}
    <time className="text-xs opacity-50">2 hours ago</time>
  </div>
  <div className="chat-bubble">{msg.text}</div>
  <div className="chat-footer opacity-50">Seen</div>
</div>
  
            );
        }) : null}
        </div>
        <div className='border-t border-gray-600 p-5 flex items-center gap-2'>
            <input value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className='flex-1 border border-gray-500 text-white rounded p-2'></input> 
            <button  onClick={sendMessage}className='btn btn-secondary'>Send</button>
        </div>
    </div>
  )
}

export default Chat
