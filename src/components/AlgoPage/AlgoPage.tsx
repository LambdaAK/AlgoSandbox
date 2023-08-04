import { useState } from "react"
import "./AlgoPage.css"
import HomeButton from "../homebutton/HomeButton"

export interface Complexity {
	bestCaseTime: string,
	averageCaseTime: string,
	worstCaseTime: string,
	bestCaseSpace: string,
	averageCaseSpace: string,
	worstCaseSpace: string,
}

export interface Implementation {
	language: string,
	code: string
}

export interface AlgoPageProps {
	overview: string,
	implementations: Implementation[],
	complexity: Complexity,
	sandbox: Function // a component
}

enum AlgoPageState {
    Overview,
    Complexity,
    Implementations,
    Sandbox
}


interface AlgoNavButtonProps {
    text: string,
    value: AlgoPageState,
    setter: Function
}
function AlgoNavButton(props: AlgoNavButtonProps) {
    return (
        <div className = "algo-nav-button" onClick = {() => props.setter(props.value)}>
            {props.text}
        </div>
    )
}

function OverViewComponent(props: AlgoPageProps) {
    return (
        <div className = "algo-overview">
            {props.overview}
        </div>
    )
}

function ComplexityComponent(props: AlgoPageProps) {
    return (
        <div className = "algo-complexity">
            Complexity
        </div>
    )
}

function ImplementationsComponent(props: AlgoPageProps) {
    return (
        <div className = "algo-implementations">
            Implementations
        </div>
    )
}


export function AlgoPage(props: AlgoPageProps) {

    const [pageState, setPageState] = useState<AlgoPageState>(AlgoPageState.Overview)

    return (
        <div className = "algo-page">
            <HomeButton/>
            <div className = "algo-nav">
                <AlgoNavButton text = "Overview" value = {AlgoPageState.Overview} setter = {setPageState}/>
                <AlgoNavButton text = "Complexity" value = {AlgoPageState.Complexity} setter = {setPageState}/>
                <AlgoNavButton text = "Implementations" value = {AlgoPageState.Implementations} setter = {setPageState}/>
                <AlgoNavButton text = "Sandbox" value = {AlgoPageState.Sandbox} setter = {setPageState}/>
            </div>
            {
                (() => {
                    switch (pageState) {
                        case AlgoPageState.Overview:
                            return <OverViewComponent {...props}/>
                        case AlgoPageState.Complexity:
                            return <ComplexityComponent {...props}/>
                        case AlgoPageState.Implementations:
                            return <ImplementationsComponent {...props}/>
                        case AlgoPageState.Sandbox:
                            return props.sandbox()
                    }
                })()
            }

        </div>
    )
}