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
function Desc(props: TitleProps) {
    return (
        <div className="algo-desc">
            {props.name}
        </div>
    )
}

interface AlgoProps {
    name: string,
    desc: string

}

export default function Algo(props: AlgoProps) {
    return (
        <div className="algo-container">
            <Title name = {props.name}/>

        </div>
    )
}