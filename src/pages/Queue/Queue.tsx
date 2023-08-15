import "./Queue.css"
import { AlgoPage, Implementation } from "../../components/AlgoPage/AlgoPage";
import { ArrayDisplay, ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils";
import { useState } from "react";
import "./../Stack/Stack.css"
import { ArrayDisplayAnimator, DSPage } from "../../components/DSPage/DSPage";

const pythonCode: string =
`class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, item):
        self.queue.append(item)

    def dequeue(self):
        if len(self.queue) == 0:
            return None
        return self.queue.pop(0)
`

const javaCode: string =
`public class Queue {
    private ArrayList<Integer> queue;
    
    public Queue() {
        queue = new ArrayList<Integer>();
    }

    public void enqueue(int item) {
        queue.add(item);
    }

    public int dequeue() {
        if (queue.size() == 0) {
            return -1;
        }
        return queue.remove(0);
    }
}
`

const cppCode: string =
`class Queue {
    private:
        vector<int> queue;
    public:
        Queue() {
            queue = vector<int>();
        }

        void enqueue(int item) {
            queue.push_back(item);
        }

        int dequeue() {
            if (queue.size() == 0) {
                return -1;
            }
            int item = queue[0];
            queue.erase(queue.begin());
            return item;
        }
};
`

const jsCode: string =
`class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(item) {
        this.queue.push(item);
    }

    dequeue() {
        if (this.queue.length == 0) {
            return null;
        }
        return this.queue.shift();
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

function enqueue(elements: ElementProps[], setElements: Function, value: number) {
    const newElements = [...elements]
    newElements.push({
        value: value,
        properties: []
    })
    setElements(newElements)
}

function dequeue(elements: ElementProps[], setElements: Function) {
    const newElements = [...elements]
    newElements.shift()
    setElements(newElements)
}

function createDequeueAnimation(elements: ElementProps[]): ElementProps[][] {
    // the first state shows the element that is getting removed
    if (elements.length == 0) {
        return []
    }
    const newElements = [...elements]
    newElements[0].properties = [Property.Secondary]

    const firstState = newElements

    // the second state remove the element
    const secondState = [...newElements]
    secondState.shift()

    return [firstState, secondState]
}

function createEnqueueAnimation(elements: ElementProps[], value: number): ElementProps[][] {
    // first frame show the unmodified array
    // the first and last elements are colored
    // second frame shows the addition of the new element, which is colored
    // third frame shows the removal of color from the second to last element, and the last element becomes colored
    // deep copy the array, so the objects are different

    const firstState = elements.map(element => {
        return (
            {...element}
        )
    })

    firstState.push({
        value: value,
        properties: [Property.Primary]
    })

    const secondState = elements.map(element => {
        return (
            {...element}
        )
    })

    secondState.push({
        value: value,
        properties: []
    })

    return [firstState, secondState]
    
}


function QueueSandbox() {

    const [elements, setElements] = useState<ElementProps[]>([])
    const [animation, setAnimation] = useState<ElementProps[][]>([])

    return (
        <div className = "stack-sandbox">
            <div className = "operations-box">
                <div className = "action-group">
                    <div className = "action-button"
                        onClick={
                            () => {
                                setAnimation(createDequeueAnimation(elements))
                                dequeue(elements, setElements)
                            }
                        }   
                    >
                        Dequeue
                    </div>
                </div>

                <div className = "action-group">
                    <div className = "action-button"
                        onClick = {
                            () => {
                                const value = document.querySelector(".action-input") as HTMLInputElement
                                setAnimation([])
                                setAnimation(createEnqueueAnimation(elements, parseFloat(value.value)))
                                enqueue(elements, setElements, parseFloat(value.value))
                                value.value = ""
                            }
                        }
                    >
                        Enqueue
                    </div>
                    <input className = "action-input" type = "text" placeholder = "Value"/>
                </div>

            </div>

            <ArrayDisplayAnimator
                frames={animation}
                setFrames={setAnimation}
                delay={1000}                
            />
        </div>
    )
}

export function Queue() {

    return (
        <DSPage
            name={"Queue"}
            overview={
                [
                    "A queue is a linear data structure that follows the FIFO (First In First Out) principle.",
                    "The first element to be inserted into the queue is the first one to be removed.",
                    "A queue is an abstract data type with the following operations:",
                    "enqueue(item): Add an item to the end of the queue.",
                    "dequeue(): Remove the first item from the queue.",
                ]
            }
            operations={
                [
                    {
                        name: "Enqueue",
                        timeComplexity: "O(1)",
                        description: ["Adds an element to the end of the queue."]
                    },
                    {
                        name: "Dequeue",
                        timeComplexity: "O(1)",
                        description: ["Removes the first element from the queue."]
                    }
                ]
            }
            implementations={implementations}
            sandbox={QueueSandbox}/>
    )

}