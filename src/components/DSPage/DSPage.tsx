import { useEffect, useState } from "react"
import Nav from "../nav/Nav"
import { AlgoHeader, AlgoNavButton, Implementation, ImplementationsComponent, OverViewComponent, PageState, animationData } from "../AlgoPage/AlgoPage"
import { AnimatePresence, motion } from "framer-motion"
import "./DSPage.css"
import { ArrayDisplay, ElementProps } from "../sandboxUtils/sandboxUtils"


export interface OperationProps {
    name: string,
    timeComplexity: string,
    description: string[]
}


interface DSPageProps {
    name: string,
    overview: string[],
    operations: OperationProps[],
    implementations: Implementation[],
    sandbox: any
}


function OperationInfo(props: OperationProps) {
    return (
        <div className="operation">
            <div className="operation-name">
                {props.name}
            </div>
            <div className="complexity-description">
                {props.description}
            </div>
            <div className="complexity-formula">
                {props.timeComplexity}
            </div>
        </div>
    )
}

function OperationsComponent(props: { operations: OperationProps[] }) {

    return (
        <motion.div className="complexity" {...animationData}>
            {
                props.operations.map((operation, index) => {
                    return (
                        <OperationInfo
                            key={index}
                            name={operation.name}
                            timeComplexity={operation.timeComplexity}
                            description={operation.description}
                        />
                    )
                })
            }
        </motion.div>
    )
}

interface ArrayDisplayAnimatorProps {
    frames: ElementProps[][],
    setFrames: (frames: ElementProps[][]) => void,
    delay: number
}
export function ArrayDisplayAnimator(props: ArrayDisplayAnimatorProps): JSX.Element {
    useEffect(() => {
        console.log(props.frames)
        // if there's only element in elements, return
        if (props.frames.length <= 1) {
            return
        }
        // set a timeout

        const id: NodeJS.Timeout = setTimeout(() => {
            console.log("timeout")
            // remove the first element
            let e = [...props.frames]
            props.setFrames(e.slice(1))
        }, props.delay)

        return () => clearTimeout(id)

    }, [props.frames, props.delay])

    return (
        <ArrayDisplay
            elements={props.frames.length > 0 ? props.frames[0] : []}
        />
    )
}

export function DSPage(props: DSPageProps) {
    const [pageState, setPageState] = useState(PageState.Overview)

    return (
        <div className="algo-page">
            <Nav />

            <AlgoHeader name={props.name} />
            <div className="algo-nav">
                <AlgoNavButton
                    text="Overview"
                    value={PageState.Overview}
                    setter={setPageState}
                    selected={pageState}
                />
                <AlgoNavButton
                    text="Operations"
                    value={PageState.Operations}
                    setter={setPageState}
                    selected={pageState}
                />
                <AlgoNavButton
                    text="Implementations"
                    value={PageState.Implementations}
                    setter={setPageState}
                    selected={pageState}
                />
                <AlgoNavButton
                    text="Sandbox"
                    value={PageState.Sandbox}
                    setter={setPageState}
                    selected={pageState}
                />
            </div>
            <AnimatePresence>
                {pageState === PageState.Overview && <OverViewComponent overview={props.overview} key="0" />}
                {pageState === PageState.Implementations && <ImplementationsComponent implementations={props.implementations} key="1" />}
                {pageState === PageState.Operations && <OperationsComponent operations={props.operations} key="2" />}
                {pageState === PageState.Sandbox &&
                    <motion.div key="3" {...animationData}>
                        <props.sandbox {...props} />
                    </motion.div>}
            </AnimatePresence>
        </div>
    )
}