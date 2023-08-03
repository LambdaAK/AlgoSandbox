import "./Nav.css"

interface NavButtonProps {
    text: string,
    dir: string
}

function NavButton(props: NavButtonProps) {
    return (
        <a href={props.dir} className = "nav-link">
            {props.text}
        </a>
    )
}


export default function Nav() {
    return (
        <div className = "nav-container">
            

        </div>
    )
}