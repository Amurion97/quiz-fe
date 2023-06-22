import {useEffect, useState} from "react";
import {socket} from "../../app/socket";
import {ConnectionState} from "../../components/socket/ConnectionState";
import {Events} from "../../components/socket/Events";
import {ConnectionManager} from "../../components/socket/ConnectionManager";
import {MyForm} from "../../components/socket/MyForm";

export default function Socket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

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

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return (
        <div className="App">
            <ConnectionState isConnected={isConnected}/>
            <Events events={fooEvents}/>
            <ConnectionManager/>
            <MyForm/>
        </div>
    );
}