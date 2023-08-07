import { useEffect, useState } from "react"
import "./ArraySortSandbox.css"
export enum Property {
    Primary,
    Secondary,
    Highlight,
    LP,
    RP,
    MP
}

export interface ElementProps {
    value: number,
    properties: Property[]
}

export interface ArrayDisplayProps {
    elements: ElementProps[]
}

interface DialogBoxProps {
    content: string
}
export function DialogBox(props: DialogBoxProps) {
    return (
        <div className = "dialog-box">
            {props.content}
        </div>
    )
}

export function ArrayDisplay(props: ArrayDisplayProps) {
    return (
        <div className = "array-display">
            {
                props.elements.map(e => <Element value = {e.value} properties = {e.properties}/>)
            }
        </div>
    )
}

interface InputSectionProps {
    arraySetter: Function,
    delaySetter: Function
}
function InputSection(props: InputSectionProps) {

    useEffect(() => {
        
        const button: HTMLElement = document.getElementById("run-button") as HTMLElement
        const delayInput: HTMLInputElement = document.getElementById("delay-input") as HTMLInputElement

        button.addEventListener("click", () => {
            const arrayInputContent: string = (document.getElementById("array-input") as HTMLInputElement).value
            const array: number[] = arrayInputContent.split(",").map(e => parseInt(e))

            console.log(array)

            props.arraySetter(array)
        })

        delayInput.addEventListener("input", () => {
            const delay: number = parseInt(delayInput.value)
            props.delaySetter(1000 - 10 * delay)
        })


    }, [])

    return (
        <div className = "input-modal">
            <ArrayInput/>
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

function Element(props: ElementProps) {
    // TODO: add the properties to the element
    const css: string = props.properties.map(p => {
        switch (p) {
            case Property.Primary:
                return "primary"
            case Property.Secondary:
                return "secondary"
            case Property.Highlight:
                return "highlight"
            case Property.LP:
                return "left-pointer"
            case Property.RP:
                return "right-pointer"
            case Property.MP:
                return "middle-pointer"
        }
    }).join(" ")

    return (
        <div className = {css + " element"}>
            {props.value}
        </div>
    )
}

export interface ArraySandboxProps {
    name: string,
    stateGenerator: Function // array -> states
}

export interface ArraySandboxState {
    dialog: string,
    elements: ElementProps[]
}

export function ArraySortSandbox(props: ArraySandboxProps) {

    const [inputArray, setInputArray] = useState([])
    const [states, setStates] = useState<ArraySandboxState[]>([])
    const [delay, setDelay] = useState(1000)

    useEffect(() => {
        // we now have a new input array and target
        // use stateGenerator to generate the states of the algorithm from the input array and target
        const newStates = props.stateGenerator(inputArray)
        setStates(newStates)


    }, [inputArray])

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
            <InputSection arraySetter={setInputArray} delaySetter={setDelay}/>
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