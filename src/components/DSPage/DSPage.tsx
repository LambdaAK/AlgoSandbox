import { useState } from "react"
import "./"
import Nav from "../nav/Nav"
import { AlgoNavButton, ComplexityComponent, Implementation, ImplementationsComponent, OverViewComponent, PageState } from "../AlgoPage/AlgoPage"
import { AnimatePresence } from "framer-motion"


interface OperationProps {
    name: string,
    timeComplexity: string,
    description: string[]
}


interface DSPageProps {
    name: string,
    overview: string[],
    operations: OperationProps[],
    implementations: Implementation[],
    sandbox: JSX.Element
}


function OperationsComponent(props: {operations: OperationProps[]}) {
    
    return (
        <div>
            Operations
        </div>
    )
}

export function DSPage(props: DSPageProps) {
    const [pageState, setPageState] = useState(PageState.Overview)

    return (
        <div className = "algo-page">
            <Nav/>

            <div className = "algo-nav">
                <AlgoNavButton
                    text = "Overview"
                    value = {PageState.Overview}
                    setter = {setPageState}
                    selected = {pageState}
                />
                <AlgoNavButton
                    text = "Operations"
                    value = {PageState.Operations}
                    setter = {setPageState}
                    selected = {pageState}
                />
                <AlgoNavButton
                    text = "Implementations"
                    value = {PageState.Implementations}
                    setter = {setPageState}
                    selected = {pageState}
                />
                <AlgoNavButton
                    text = "Complexity"
                    value = {PageState.Complexity}
                    setter = {setPageState}
                    selected = {pageState}
                />
                <AlgoNavButton
                    text = "Sandbox"
                    value = {PageState.Sandbox}
                    setter = {setPageState}
                    selected = {pageState}
                />
            </div>
            <AnimatePresence>
            {pageState === PageState.Overview && <OverViewComponent overview = {props.overview} key = "0"/>}
            {pageState === PageState.Implementations && <ImplementationsComponent implementations={props.implementations} key = "1"/>}
            {pageState === PageState.Operations && <OperationsComponent operations = {props.operations} key = "2"/>}
            {pageState === PageState.Sandbox && <props.sandbox {...props} key = "3"/>}
            </AnimatePresence>
        </div>
    )
}