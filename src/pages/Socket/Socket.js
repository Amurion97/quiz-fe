import {useEffect, useState} from "react";
import {socket} from "../../app/socket";
import {ConnectionState} from "../../components/socket/ConnectionState";
import {Events} from "../../components/socket/Events";
import {ConnectionManager} from "../../components/socket/ConnectionManager";
import {MyForm} from "../../components/socket/MyForm";

export default function Socket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [lobbyUpdates, setLobbyUpdates] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }

        function onLobbyEvent(value) {
            setLobbyUpdates(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);
        socket.on('lobby-update', onLobbyEvent);
        socket.on('already-in-room', onLobbyEvent);


        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
            socket.off('lobby-update', onLobbyEvent);
        };
    }, []);

    return (
        <div className="App">
            <ConnectionState isConnected={isConnected}/>
            <Events events={fooEvents}/>
            <p>Room Updates:</p>
            <Events events={lobbyUpdates}/>
            <ConnectionManager/>
            <MyForm/>
        </div>
    );
}