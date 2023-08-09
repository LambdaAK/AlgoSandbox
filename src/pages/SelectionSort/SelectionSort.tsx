import { AlgoPage, AlgoPageProps, Implementation, Complexity } from "../../components/AlgoPage/AlgoPage";
import { ArraySandboxState, ArraySortSandbox } from "../../components/ArraySortSandbox/ArraySortSandbox";
import { ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils";

const pythonCode: string =
`def selection_sort(arr):
    for i in range(len(arr)):
        min_index = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
`

const javaCode: string =
`public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}
`

const cppCode: string =
`void selectionSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}
`

const jsCode: string =
`function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
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

const jsImplentation: Implementation = {
    language: "javascript",
    code: jsCode
}

const complexity: Complexity = {
    bestCaseTime: "O(n^2)",
    averageCaseTime: "O(n^2)",
    worstCaseTime: "O(n^2)",
    bestCaseSpace: "O(1)",
    averageCaseSpace: "O(1)",
    worstCaseSpace: "O(1)"
}

export const selectionSortStateGenerator = (inputArray: number[]): ArraySandboxState[] => {
    const states: ArraySandboxState[] = []
    let comparisons: number = 0
    let swaps: number = 0
    for (let i = 0; i < inputArray.length; i++) {
        for (let j = i + 1; j < inputArray.length; j++) {
            // add a state, color i primary and j secondary
            comparisons++
            const newDialog: string = `Scanning`
            const newElements: ElementProps[] = inputArray.map((value: number, index: number) => {
                if (index == i) {
                    return {
                        value: value,
                        properties: [Property.LP]
                    }
                }
                else if (index == j) {
                    return {
                        value: value,
                        properties: [Property.RP]
                    }
                }
                else {
                    return {
                        value: value,
                        properties: []
                    }
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

            // compare
            if (inputArray[i] > inputArray[j]) {
                swaps++
                // swap
                const temp = inputArray[i]
                inputArray[i] = inputArray[j]
                inputArray[j] = temp

                // add a state, color i secondary and j primary

                const newDialog: string = `Swapped ${inputArray[i]} and ${inputArray[j]}`

                const newElements: ElementProps[] = inputArray.map((value: number, index: number) => {
                    if (index == i) {
                        return {
                            value: value,
                            properties: [Property.RP]
                        }
                    }
                    else if (index == j) {
                        return {
                            value: value,
                            properties: [Property.LP]
                        }
                    }
                    else {
                        return {
                            value: value,
                            properties: []
                        }
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
    }
    states.push({
        dialog: `The array is now sorted. It took ${comparisons} comparisons and ${swaps} swaps for an array of length ${inputArray.length}.`,
        elements: inputArray.map((value: number) => {
            return {
                value: value,
                properties: []
            }
        }),
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
    name: "Selection Sort",
    overview: [
        "Selection sort is a sorting algorithm that sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning.",
        "The algorithm maintains two subarrays in a given array.",
        "1) The subarray which is already sorted.",
        "2) Remaining subarray which is unsorted.",
        "In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted subarray."
    ],
    implementations: [pythonImplentation, javaImplentation, cppImplentation, jsImplentation],
    complexity: complexity,
    sandbox: () => <ArraySortSandbox stateGenerator={selectionSortStateGenerator} name={"Selection Sort"}/>
}

export default function SelectionSort() {
    return (
        <AlgoPage {...props}/>
    )
}