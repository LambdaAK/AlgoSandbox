import { useState } from "react";
import { AlgoPage, Implementation } from "../../components/AlgoPage/AlgoPage";
import { ArrayDisplay, ElementProps } from "../../components/sandboxUtils/sandboxUtils";
import "./Stack.css"
import { DSPage } from "../../components/DSPage/DSPage";


function push(elements: ElementProps[], setElements: Function, element: number) {
    const newElements = [{value: element, properties: []}, ...elements]
    setElements(newElements)
}

function pop(elements: ElementProps[], setElements: Function) {
    if (elements.length === 0) return
    const newElements = [...elements]
    newElements.shift()
    setElements(newElements)
}


const pythonCode: string =
`class Stack:
    def __init__(self):
        self.stack = []
    
    def push(self, element):
        self.stack.append(element)
    
    def pop(self):
        if len(self.stack) == 0:
            return None
        return self.stack.pop()
`

const javaCode: string =
`class Stack {
    ArrayList<Integer> stack = new ArrayList<Integer>();

    public void push(int element) {
        stack.add(element);
    }

    public int pop() {
        if (stack.size() == 0) {
            return null;
        }
        return stack.remove(stack.size() - 1);
    }
}
`

const cppCode: string =
`class Stack {
    vector<int> stack;

    public:
        void push(int element) {
            stack.push_back(element);
        }

        int pop() {
            if (stack.size() == 0) {
                return NULL;
            }
            int element = stack.back();
            stack.pop_back();
            return element;
        }
};
`

const jsCode: string =
`class Stack {
    constructor() {
        this.stack = [];
    }

    push(element) {
        this.stack.push(element);
    }

    pop() {
        if (this.stack.length === 0) {
            return null;
        }
        return this.stack.pop();
    }
}
`

const implementations: Implementation[] = [
    {
        language: "python",
        code: pythonCode
    },
    {
        language: "java",
        code: javaCode
    },
    {
        language: "cpp",
        code: cppCode
    },
    {
        language: "javascript",
        code: jsCode
    }
]


function StackSandbox() {

    const [elements, setElements] = useState<ElementProps[]>([])

    return (
        <div className = "stack-sandbox">
            <div className = "operations-box">
                <div className = "action-group">
                    <div className = "action-button"
                        onClick={
                            () => {
                                pop(elements, setElements)
                            }
                        }
                    >
                        Pop
                    </div>
                </div>

                <div className = "action-group">
                    <div className = "action-button"
                        onClick = {
                            () => {
                                const value = document.querySelector(".action-input") as HTMLInputElement
                                push(elements, setElements, parseFloat(value.value))
                                value.value = ""
                            }
                        }
                    >
                        Push
                    </div>
                    <input className = "action-input" type = "text" placeholder = "Value"/>
                </div>


            </div>

            <ArrayDisplay
                elements = {elements}
            />

        </div>
    )
}


export function Stack() {

    return (
        <DSPage
            name = "Stack"
            overview = {
                [
                    "A stack is a data structure that stores elements in a last-in-first-out (LIFO) manner.",
                    "This means that the last element added to the stack will be the first element removed from the stack."
                ]
            }
            operations = {
                [
                    {
                        "name": "Push",
                        "description": ["Adds an element to the top of the stack."],
                        "timeComplexity": "O(1)"
                    },
                    {
                        "name": "Pop",
                        "description": ["Removes the top element from the stack and returns it."],
                        "timeComplexity": "O(1)"
                    }
                ]
            }
            implementations = {
                implementations
            }
            sandbox = {StackSandbox}
        />
    )

}