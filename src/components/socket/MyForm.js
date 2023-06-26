import {useState} from "react";
import {socket} from "../../app/socket";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/user/userSlice";

export function MyForm({setLobbyUpdates}) {
    const user = useSelector(selectUser)
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const roomCode = 269612

    function connectToRoom() {
        socket.emit('join-lobby',
            {roomCode: roomCode, email: user.info.email},
            (res) => {
                setLobbyUpdates(previous => [...previous, value]);
            })
    }

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        socket.timeout(5000).emit('send-all', value, (err, response) => {
            if (err) {
                // the other side did not acknowledge the event in the given delay
                console.log("err:", err)
            } else {
                console.log("response:", response);
            }
            setIsLoading(false);
        });
    }

    function sendToRoom() {
        console.log("trying to send to lobby")
        socket.emit('send-to-lobby', {roomCode: roomCode, msg: "user.info.email"})
    }

    return (
        <form onSubmit={onSubmit}>
            <input onChange={e => setValue(e.target.value)}/>

            <button type="submit" disabled={isLoading}>Submit</button>

            <br/>
            <button type={'button'} onClick={connectToRoom}>
                Connect to room 1
            </button>

            <button type={'button'} onClick={sendToRoom}>
                Send to room 1
            </button>
        </form>
    );
}