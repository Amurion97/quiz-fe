//React
import {useEffect} from "react";
import {useState} from "react";
import {useLocation} from "react-router-dom";

//Mui
import {Typography} from "@mui/material";
//Component
import {customAPIv1} from "../../features/customAPI";


export default function Tags() {
    const location = useLocation();
    console.log("location in Icon of Result-Static:", location)
    const {state} = location;
    let id;
    if (state) {
        ({id} = state);
    }
    const [attempts, setAttempts] = useState([]);
    const updateAttempts = () => {
        customAPIv1()
            .get(`/attempts/test/${id}`)
            .then((res) => {
                console.log("attempts of test:", res.data);
                setAttempts(res.data.data);
            })
            .catch((e) => console.log("error in get attempts:", e));
    };
    useEffect(() => {
        console.log("attempts page did mount");
        updateAttempts();
    }, []);
    console.log("attemp page", attempts)
    return (
        <>
            <Typography variant="h3" sx={{textAlign: "left"}}>
                {attempts.map((item, index) => (
                    index == 0 ? item.test.name : ""
                ))}
            </Typography>
            <hr/>

            {/*<Typography variant="h7" sx={{ textAlign: "left" }}>*/}
            {/*    {attempts.map((item, index) => (*/}
            {/*        index == 0 ? item.finish : ""*/}
            {/*    ))}*/}
            {/*</Typography>*/}

            <Typography variant="h6" sx={{textAlign: "left"}}>
                Thẻ: {' '}
                {attempts.map((item, index) => {
                    if (index === 0) {
                        return item.test.tags.map((tag, tagIndex) => {
                            if (tagIndex === item.test.tags.length - 1) {
                                return tag.name + ".";
                            } else {
                                return tag.name + ", ";
                            }
                        }).join(" ");
                    } else {
                        return "";
                    }
                })}
            </Typography>

        </>
    );
}
