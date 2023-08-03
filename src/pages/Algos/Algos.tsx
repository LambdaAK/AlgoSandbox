import HomeButton from "../../components/homebutton/HomeButton"
import Home from "../Home/Home"
import Algo from "../../components/algo/Algo"
import "./Algos.css"

export default function Algos() {
    return (
    
        <>
            <HomeButton />
            <div className = "algos-container">
                <Algo name = "Selection Sort"/>
            </div>
        </>
    )
}