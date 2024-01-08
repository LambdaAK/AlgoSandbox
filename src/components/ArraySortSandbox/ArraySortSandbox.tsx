import { useEffect, useState } from "react"
import "./ArraySortSandbox.css"
import { ArrayDisplay, ArrayInput, DelaySetter, DialogBox, ElementProps, RunButton, StatisticsBox } from "../sandboxUtils/sandboxUtils"
import { motion } from "framer-motion"
import { animationData } from "../AlgoPage/AlgoPage"

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
            const array: number[] = arrayInputContent.split(",").map(e => Number(e))

            console.log(array)

            props.arraySetter(array)
        })

        delayInput.addEventListener("input", () => {
            const delay: number = parseInt(delayInput.value)
            props.delaySetter(1000 - 10 * delay)
        })

    }, [])

    return (
        <div className="input-modal">
            <ArrayInput />
            <DelaySetter />
            <RunButton />
        </div>
    )
}

export interface ArraySandboxProps {
    name: string,
    stateGenerator: Function // array -> states
}

export interface ArraySandboxState {
    dialog: string,
    elements: ElementProps[],
    statistics: object
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
        <motion.div className="array-sandbox" {...animationData}>
            <InputSection arraySetter={setInputArray} delaySetter={setDelay} />
            <DialogBox content={
                (() => {
                    if (states.length === 0) {
                        return ""
                    }
                    else {
                        return states[0].dialog
                    }
                })()
            } />
            {
                (() => {
                    if (states.length === 0) {
                        return <div></div>
                    }
                    else {
                        return <StatisticsBox {...states[0].statistics} />
                    }
                })()
            }
            <ArrayDisplay elements={
                (() => {
                    if (states.length === 0) {
                        return []
                    }
                    else {
                        return states[0].elements
                    }
                })()
            } />
        </motion.div>
    )
}