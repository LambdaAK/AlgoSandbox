import { motion } from "framer-motion"
import AlgoIcon from "../algo icons/AlgoIcon"
import "./Algo.css"

interface TitleProps {
    name: string,
    dir: string
}
function Title(props: TitleProps) {
    return (
        <div className="algo-title"
        onClick = {
            () => {
                window.location.href = props.dir
            }
        }
        >
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
    icons: string[],
    dir: string
}

export default function Algo(props: AlgoProps) {
    return (
        <motion.div
            className="algo-container"
        >
            <Title name = {props.name} dir = {props.dir}/>
            <Desc desc = {props.desc}/>
            <div className = "algo-icons">
            {
                props.icons.map(icon => AlgoIcon({name: icon}))
            }
            </div>
            
        </motion.div>
    )
}