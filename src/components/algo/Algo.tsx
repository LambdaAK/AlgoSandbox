import AlgoIcon from "../algo icons/AlgoIcon"
import "./Algo.css"

interface TitleProps {
    name: string,
}
function Title(props: TitleProps) {
    return (
        <div className="algo-title">
            {props.name}
        </div>
    )
}

interface DescProps {
    desc: string
}
function Desc(props: DescProps) {
    return (
        <div className="algo-desc">
            {props.desc}
        </div>
    )
}

interface AlgoProps {
    name: string,
    desc: string,
    icons: string[]
}

export default function Algo(props: AlgoProps) {
    return (
        <div className="algo-container">
            <Title name = {props.name}/>
            <Desc desc = {props.desc}/>
            <div className = "algo-icons">
            {
                props.icons.map(icon => AlgoIcon({name: icon}))
            }
            </div>
            
        </div>
    )
}