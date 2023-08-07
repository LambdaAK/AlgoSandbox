import { useEffect, useState } from "react"
import "./ArraySearchSandbox.css"
import { ArrayDisplay, DialogBox, ElementProps } from "../sandboxUtils/sandboxUtils"


interface InputSectionProps {
    arraySetter: Function,
    targetSetter: Function,
    delaySetter: Function
}

function InputSection(props: InputSectionProps) {

    useEffect(() => {
        
        const button: HTMLElement = document.getElementById("run-button") as HTMLElement
        const slider: HTMLElement = document.getElementById("delay-input") as HTMLElement

        button.addEventListener("click", () => {
            const arrayInputContent: string = (document.getElementById("array-input") as HTMLInputElement).value
            const targetInputContent: string = (document.getElementById("target-input") as HTMLInputElement).value
            const array: number[] = arrayInputContent.split(",").map(e => parseInt(e))
            const target: number = parseInt(targetInputContent)

            console.log(array)
            console.log(target)

            props.arraySetter(array)
            props.targetSetter(target)
        })

        slider.addEventListener("input", () => {
            props.delaySetter(1000 - 10 * parseInt((document.getElementById("delay-input") as HTMLInputElement).value))
        })

    }, [])

    return (
        <div className = "input-modal">
            <div className = "input-fields">
                <ArrayInput/>
                <TargetInput/>
            </div>
            <DelaySetter/>
            <RunButton/>
        </div>
    )
}


function ArrayInput() {
    return (
        <input
            id = "array-input"
            className = "array-input"
            type = "text"
            placeholder = "Input Array"
        >

        </input>
    )
}

function TargetInput() {
    return (
        <input
            id = "target-input"
            className = "target-input"
            type = "text"
            placeholder = "Input Target Value"   
        >
        </input>
    )
}

function RunButton() {
    return (
        <button id = "run-button" className = "run-button">
            Run
        </button>
    )
}

function DelaySetter() {
    return (
        <>
            <div className = "delay-header">
                Speed
            </div>
            <input
                id = "delay-input"
                className = "delay-input"
                type = "range"
            ></input>
        </>
    )
}

export interface ArraySearchSandboxProps {
    name: string,
    stateGenerator: Function // array -> target -> states
}

export interface ArraySearchSandboxState {
    dialog: string,
    elements: ElementProps[]
}

export function ArraySearchSandbox(props: ArraySearchSandboxProps) {

    const [inputArray, setInputArray] = useState([])
    const [target, setTarget] = useState(0)
    const [states, setStates] = useState<ArraySearchSandboxState[]>([])
    const [delay, setDelay] = useState(1000)

    useEffect(() => {
        // we now have a new input array and target
        // use stateGenerator to generate the states of the algorithm from the input array and target
        const newStates = props.stateGenerator(inputArray, target)
        setStates(newStates)


    }, [inputArray, target])

    useEffect(() => {
        if (states.length === 1) {
            return
        }
        const id = setTimeout(() => {
            setStates(states.slice(1))
        }, delay)

        return () => clearTimeout(id) // clear the timeout when the component unmounts

    }, [states])

    return (
        <div className = "array-sandbox">
            <InputSection arraySetter={setInputArray} targetSetter={setTarget} delaySetter={setDelay}/>
            <DialogBox content={
                (() => {
                    if (states.length === 0) {
                        return ""
                    }
                    else {
                        return states[0].dialog
                    }
                })()
            }/>
            <ArrayDisplay elements={
                (() => {
                    if (states.length === 0) {
                        return []
                    }
                    else {
                        return states[0].elements
                    }
                })()
            }/>
        </div>
    )  
}