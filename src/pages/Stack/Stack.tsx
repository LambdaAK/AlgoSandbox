import { useState } from "react";
import { AlgoPage } from "../../components/AlgoPage/AlgoPage";
import { ArrayDisplay, ElementProps } from "../../components/sandboxUtils/sandboxUtils";


function StackSandbox() {

    const [elements, setElements] = useState<ElementProps[]>([])

    return (
        <div className = "stack-standbox">
            Stack Sandbox

            <div className = "operations-box">

            </div>

            <ArrayDisplay
                elements = {elements}
            />

        </div>
    )
}


export function Stack() {

    return <AlgoPage 
        name = "Stack"
        overview = {
            [
                "A stack is a data structure that follows the Last In First Out (LIFO) principle. This means that the last element added to the stack will be the first element removed from the stack. Think of a stack of plates. The last plate you put on the stack will be the first plate you take off the stack.",
            ]
        }
        implementations = {[]}
        complexity = {{
            "averageCaseSpace": "O(n)",
            "averageCaseTime": "O(1)",
            "bestCaseSpace": "O(n)",
            "bestCaseTime": "O(1)",
            "worstCaseSpace": "O(n)",
            "worstCaseTime": "O(1)"
        }}
        sandbox = {StackSandbox}
    />

}