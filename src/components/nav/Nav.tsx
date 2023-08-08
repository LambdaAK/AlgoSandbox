import "./Nav.css"

interface NavButtonProps {
    text: string,
    dir: string
}

export default function Nav() {
    return (
        <div className = "nav">
            <a href="/" className = "nav-button">
                Home
            </a>
            <a href="/algos" className = "nav-button">
                Algos
            </a>
        </div>
    )
}