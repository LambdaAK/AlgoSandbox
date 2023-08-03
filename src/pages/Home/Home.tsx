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

function AlgosLink() {
    return (
        <a href="/algos" className = "algos-link">
            Algos
        </a>
    )
}


export default function Home() {
    return (
        <div className = "home-container">
            <Title />
            <Desc />
            <AlgosLink />
        </div>
    )
}