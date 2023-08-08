import "./Home.css"
import Nav from "../../components/nav/Nav"
import SortText, { Order, Size, Sort } from "../../components/SortText/SortText"


export default function Home() {
    return (
        <div className = "home-container">
            <Nav/>
            <SortText
                text="AlgoSandbox"
                sort={Sort.Insertion}
                order={Order.Descending}
                size={Size.XL}
            />
        </div>
    )
}