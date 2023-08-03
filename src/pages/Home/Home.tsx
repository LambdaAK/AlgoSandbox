import "./Home.css"

function Title() {
    return (
        <div className = "title">
            AlgoSandbox
        </div>
    )
}

function Desc() {
    return (
        <div className = "desc">
            A resource for learning about algorithms and data structures in a fun and interactive way
        </div>
    )
}


export default function Home() {
    return (
        <div className = "home-container">
            <Title />
            <Desc />
        </div>
    )
}