import "./Home.css"
import Nav from "../../components/nav/Nav"
import SortText from "../../components/SortText/SortText"


export default function Home() {
    return (
        <div className = "home-container">
            <Nav/>
            <SortText text="AlgoSandbox"/>
        </div>
    )
}