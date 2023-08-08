import "./SortText.css"
import { selectionSortStateGenerator } from "../../pages/SelectionSort/SelectionSort";
import { insertionSortStateGenerator } from "../../pages/InsertionSort/InsertionSort";
import { mergeSortIterativeStateGenerator } from "../../pages/MergeSortIterative/MergeSortIterative";
import { mergeSortStateGenerator } from "../../pages/MergeSort/MergeSort";
import { ArraySandboxState } from "../ArraySortSandbox/ArraySortSandbox";
import { ElementProps, Property, propertiesToString } from "../sandboxUtils/sandboxUtils";
import { useEffect, useState } from "react";

const stateGenerators: Function[] = [
    selectionSortStateGenerator,
    insertionSortStateGenerator,
    mergeSortIterativeStateGenerator,
    mergeSortStateGenerator
]

export interface LetterProp {
    letter: string,
    properties: Property[]
}

function Letter(props: LetterProp) {
    const classes: string = propertiesToString(props.properties)
    return (
        <div className = {"sort-text-element " + classes}>
            {props.letter}
        </div>
    )
}

export enum Sort {
    Selection,
    Insertion,
    Merge,
    MergeIterative,
    Random
}

export enum Order {
    Ascending,
    Descending,
    Random
}

export enum Size {
    XS,
    SM,
    MD,
    LG,
    XL
}

interface SortTextProps {
    text: string,
    sort: Sort,
    order: Order,
    size: Size
}
export default function SortText(props: SortTextProps) {
    const [states, setStates] = useState<LetterProp[][]>([])

    useEffect(() => {
        // pick a state generator from a random sorting algorithm
        const stateGenerator: Function = (() => {
            switch (props.sort) {
                case Sort.Selection:
                    return selectionSortStateGenerator
                case Sort.Insertion:
                    return insertionSortStateGenerator
                case Sort.Merge:
                    return mergeSortStateGenerator
                case Sort.MergeIterative:
                    return mergeSortIterativeStateGenerator
                case Sort.Random:
                    return stateGenerators[Math.floor(Math.random() * stateGenerators.length)]
            }
        })()

        // generate states

        // make an array of the length of text, 0 - n
        const arr: number[] = Array.from(Array(props.text.length).keys())

        // convert text to array of characters
        const textArray: string[] = props.text.split("")

        // shuffle array according to the specification
        switch (props.order) {
            case Order.Ascending:
                break
            case Order.Descending:
                arr.reverse()
                break
            case Order.Random:
                for (let i = 0; i < props.text.length * 10; i++) {
                    // pick two random indices
                    const index1: number = Math.floor(Math.random() * props.text.length)
                    const index2: number = Math.floor(Math.random() * props.text.length)
                    // swap them
                    const temp: number = arr[index1]
                    arr[index1] = arr[index2]
                    arr[index2] = temp
                }
                break
        }
        
        // generate the states for sorting arr
        const sandboxStates: ArraySandboxState[] = stateGenerator(arr)
        // we want just the elmements, not the dialog
        const sandboxStatesNoDialog: ElementProps[][] = sandboxStates.map((state: ArraySandboxState) => state.elements)
        
        // map the element props to states with the letters

        const letterProps: LetterProp[][] = sandboxStatesNoDialog.map((elementProps: ElementProps[]) => {
            // elementProps is an array of ElementProps
            // each entry is an element in the array
            const elementPropsMapped = elementProps.map((elementProp: ElementProps) => {
                const letter: string = textArray[elementProp.value]
                return {
                    letter: letter,
                    properties: elementProp.properties
                }
            })
            return elementPropsMapped
        })

        // add more states, where the letters get primary class one at a time, starting from the beginning

        

    
        setStates(letterProps)
    }, [props, props.text])

    useEffect(() => {
        if (states.length === 1) {
            return
        }
        const id = setTimeout(() => {
            setStates(states.slice(1))
        }, 75)

        return () => clearTimeout(id) // clear the timeout when the component unmounts

    }, [states])

    const css: string = (() => {
        switch (props.size) {
            case Size.XS:
                return "text-xs"
            case Size.SM:
                return "text-sm"
            case Size.MD:
                return "text-md"
            case Size.LG:
                return "text-lg"
            case Size.XL:
                return "text-xl"
        }
    })()

    return (
        <div className = {"sort-text " + css}>
            {
                (() => {
                    const s: LetterProp[] = (() => {
                        if (states.length === 0) {
                            return []
                        }
                        return states[0]
                    })()
                    return s.map((letterProp: LetterProp) => 
                        <Letter
                            letter = {letterProp.letter}
                            properties = {letterProp.properties}
                        />)
                })()
            }
        </div>
    )

}