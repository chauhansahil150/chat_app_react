import React, { useState } from "react";
import { io } from "socket.io-client";
export const SocketContext = React.createContext()

export const SocketState = (props) => {
    const socket = io("http://localhost:8000",{autoConnect:false})
    return (
        <SocketContext.Provider value={{socket}}>
            {
                props.children
            }
        </SocketContext.Provider>
    )
}
