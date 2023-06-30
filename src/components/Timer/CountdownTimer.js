import Countdown from "react-countdown";
import {Typography} from "@mui/material";

export function CountdownTimer ({startTime, testTime, submitForm}) {
    const renderer = (x) => {

        if (x.completed) {
        } else {
            // Render a countdown
            return <Typography variant={'h3'}>{x.hours}:{x.minutes}:{x.seconds}</Typography>;
        }
    };
    return (
        <Countdown
            date={startTime + (1000 * 60 * testTime)}
            renderer={renderer}
            onComplete={submitForm}
        />
    )
}