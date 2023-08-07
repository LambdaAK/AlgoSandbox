import { AlgoPage, AlgoPageProps, Implementation, Complexity } from "../../components/AlgoPage/AlgoPage";
import { ArraySearchSandbox, ArraySearchSandboxProps, ArraySearchSandboxState } from "../../components/ArraySearchSandbox/ArraySearchSandbox";
import { ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils";


const pythonCode: string =
`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
`

const javaCode: string =
`public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
`

const cppCode: string =
`int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
`

const jsCode: string =
`function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}
`

const implementations: Implementation[] = [
    //lowercase
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

const complexity: Complexity = {
    worstCaseTime: "O(n)",
    averageCaseTime: "O(n)",
    bestCaseTime: "O(1)",
    worstCaseSpace: "O(1)",
    averageCaseSpace: "O(1)",
    bestCaseSpace: "O(1)"
}

const linearSearchStateGenerator = (inputArray: number[], target: number): ArraySearchSandboxState[] => {
    const states: ArraySearchSandboxState[] = []

    // generate the states for a linear search
    // the target has the Primary property
    // the current index has the secondary property
    // once the target is found, the current index has the highlight property
    // if the target is not found, the dialog of the last state is "Target not found"
    // if the target is found, the dialog of the last state is "Target found at index i"
    // the dialog of the first state is "Starting linear search with target t"

    const targetIndex: number = inputArray.indexOf(target)

    for (let i = 0; i < inputArray.length; i++) {
        if (i == targetIndex) {
            const elements: ElementProps[] = inputArray.map((value, index) => {
                if (index == i) {
                    return {
                        value: value,
                        properties: [Property.Highlight]
                    }
                } else {
                    return {
                        value: value,
                        properties: []
                    }
                }
            })
            const dialog: string = `Target found at index ${i}`
            states.push({
                dialog: dialog,
                elements: elements
            })
            break
        }
        else {
            const elements: ElementProps[] = inputArray.map((value: number, index: number) => {
                return {
                    value: value,
                    properties:
                        (() => {
                            if (index == i) {
                                return [Property.Primary]
                            }
                            else if (index == targetIndex) {
                                return [Property.Secondary]
                            }
                            else {
                                return []
                            }
                        })() 
                }
            })

            const dialog: string = `Searching for target ${target} at index ${i}`
            states.push({
                dialog: dialog,
                elements: elements
            })
        }

    }
    if (targetIndex == -1) {
        const elements: ElementProps[] = inputArray.map(value => {
            return {
                value: value,
                properties: []
            }
        })
        const dialog: string = `Target not found`
        states.push({
            dialog: dialog,
            elements: elements
        })
    }

    return states
}

const LinearSearchSandbox = () => {
    return (
        <ArraySearchSandbox name = "Linear Search" stateGenerator = {linearSearchStateGenerator} />
    )
}


const props: AlgoPageProps = {
    name: "Linear Search",
    overview: [
        "Linear search is a simple search algorithm that sequentially scans a list to locate a target element.",
        "It is also known as sequential search.",
        "It is the most basic search algorithm and is often used as a subroutine to other more complex algorithms.",
        "It is inefficient on large lists, but is very simple and intuitive.",
        "It is also very efficient on small lists."
    ],
    implementations: implementations,
    complexity: complexity,
    sandbox: () => <LinearSearchSandbox/>
}

export default function LinearSearch() {
    return (
        <AlgoPage {...props} />
    )
}