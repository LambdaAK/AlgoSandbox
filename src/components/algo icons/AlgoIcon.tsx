import "./AlgoIcon.css"
interface AlgoIconProps {
    name: string
}
export default function AlgoIcon(props: AlgoIconProps) {
    return (
        <div className = "algo-icon">
            {props.name}
        </div>
    )
}