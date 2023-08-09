import { AlgoPage, AlgoPageProps, Complexity, Implementation } from "../../components/AlgoPage/AlgoPage"
import { ArraySandboxState, ArraySortSandbox } from "../../components/ArraySortSandbox/ArraySortSandbox"
import { ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils"
import { selectionSortStateGenerator } from "../SelectionSort/SelectionSort"

const pythonCode: string =
`def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr) - 1, i, -1):
            if arr[j] < arr[j - 1]:
                arr[j], arr[j - 1] = arr[j - 1], arr[j]

`
const javaCode: string =
`public static void bubbleSort(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = arr.length - 1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                int temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }
}
`

const cppCode: string =
`void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = n - 1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                int temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }
}
`

const javaScriptCode: string =
`function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = arr.length - 1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                let temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            }
        }
    }
}
`

const pythonImplentation: Implementation = {
    language: "python",
    code: pythonCode
}

const javaImplentation: Implementation = {
    language: "java",
    code: javaCode
}

const cppImplentation: Implementation = {
    language: "cpp",
    code: cppCode
}

const javaScriptImplementation: Implementation = {
    language: "javascript",
    code: javaScriptCode
}

const complexity: Complexity = {
    bestCaseTime: "O(n)",
    averageCaseTime: "O(n^2)",
    worstCaseTime: "O(n^2)",
    bestCaseSpace: "O(1)",
    averageCaseSpace: "O(1)",
    worstCaseSpace: "O(1)"
}

// bubble sort function


export const bubbleSortStateGenerator = (arr: number[]) => {
    const states: ArraySandboxState[] = []
    let comparisons: number = 0
    let swaps: number = 0
    function bubbleSort(arr: number[]) {
        for (let i = 0; i < arr.length; i++) {
            let swapped = false;
            for (let j = arr.length - 1; j > i; j--) {
                comparisons++

                // add state
                const newDialog: string = `i = ${i}, j = ${j}`
                const newElements: ElementProps[] = arr
                    .map((value: number, index: Number) => {
                        const properties: Property[] = []
                        if (index == i) {
                            properties.push(Property.LP)
                        }
                        else if (index == j) {
                            properties.push(Property.Primary)
                        }
                        else if (index == j - 1) {
                            properties.push(Property.Secondary)
                        }
                        return {
                            value: value,
                            properties: properties
                        }
                    })
                states.push({
                    dialog: newDialog,
                    elements: newElements,
                    statistics: {
                        comparisons: comparisons,
                        swaps: swaps,
                        i: i,
                        j: j
                    }
                })

                if (arr[j] < arr[j - 1]) {
                    swaps++
                    swapped = true;
                    let temp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = temp;

                    // add state
                    const newDialog: string = `i = ${i}, j = ${j}, swapped`
                    const newElements: ElementProps[] = arr
                        .map((value: number, index: Number) => {
                            const properties: Property[] = []
                            if (index == i) {
                                properties.push(Property.LP)
                            }
                            else if (index == j) {
                                properties.push(Property.Primary)
                            }
                            else if (index == j - 1) {
                                properties.push(Property.Secondary)
                            }
                            return {
                                value: value,
                                properties: properties
                            }
                        })
                    states.push({
                        dialog: newDialog,
                        elements: newElements,
                        statistics: {
                            comparisons: comparisons,
                            swaps: swaps,
                            i: i,
                            j: j
                        }
                    })
                }
            }
            if (!swapped) {
                break;
            }
        }
    }
    bubbleSort(arr)
    // add a finishing state
    const newDialog: string = `Finished sorting with ${comparisons} comparisons and ${swaps} swaps`
    const newElements: ElementProps[] = arr
        .map((value: number) => {
            return {
                value: value,
                properties: []
            }
        })
    states.push({
        dialog: newDialog,
        elements: newElements,
        statistics: {
            comparisons: comparisons,
            swaps: swaps,
            i: -1,
            j: -1
        }
    })
    return states
}

const props: AlgoPageProps = {
    name: "Bubble Sort",
    overview: [
        "Bubble sort is a sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.",
        "It is called bubble sort because the largest elements bubble to the top of the array."
    ],
    implementations: [
        pythonImplentation,
        javaImplentation,
        cppImplentation,
        javaScriptImplementation
    ],
    complexity: complexity,
    sandbox: () => <ArraySortSandbox stateGenerator = {bubbleSortStateGenerator} name = {"Bubble Sort"}/>
}

export const BubbleSort = () => {
    return (
        <AlgoPage {...props}/>
    )
}