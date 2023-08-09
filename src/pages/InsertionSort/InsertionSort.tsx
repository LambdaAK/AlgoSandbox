import {AlgoPage, AlgoPageProps, Implementation, Complexity} from "../../components/AlgoPage/AlgoPage";
import { ArraySandboxState, ArraySortSandbox } from "../../components/ArraySortSandbox/ArraySortSandbox";
import { ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils";

const pythonCode: string =
`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
`

const javaCode: string =
`public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}
`

const cppCode: string =
`void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}
`

const jsCode: string =
`function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && key < arr[j]) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
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

const complexity: Complexity = {
    worstCaseTime: "O(n^2)",
    averageCaseTime: "O(n^2)",
    bestCaseTime: "O(n)",
    worstCaseSpace: "O(1)",
    averageCaseSpace: "O(1)",
    bestCaseSpace: "O(1)"
}

/*
function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}
*/

export const insertionSortStateGenerator = (inputArray: number[]) => {
    const states: ArraySandboxState[] = []
    let comparisons: number = 0
    let insertions: number = 0
    
    for (let i = 1; i < inputArray.length; i++) {
        // i is the index of the end of the sorted portion of the array
        let j = i - 1 // insertion index
        let current = inputArray[i]
        while (j >= 0 && current < inputArray[j]) {
            comparisons++
            // new state
            const newDialog: string = `i = ${i}, j = ${j}`
            const newElements: ElementProps[] = inputArray.map((value: number, index: number) => {
                const properties: Property[] = []
                if (index == i) {
                    properties.push(Property.LP)
                }
                if (index == j) {
                    properties.push(Property.RP)
                }
                
                if (index < i) {
                    properties.push(Property.Sorted)
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
                    insertions: insertions,
                    i: i,
                    j: j
                }
            })

            // move element
            inputArray[j + 1] = inputArray[j]
            j--
        }
        // now, j + 1 is where arr[i] should be inserted
        inputArray[j + 1] = current
        insertions++
        // new state

        const newDialog: string = `inserted ${inputArray[i]} at index ${j + 1}`
        const newElements: ElementProps[] = inputArray.map((value: number, index: number) => {
            const properties: Property[] = []
            if (index == i) {
                properties.push(Property.LP)
            }
            if (index == j) {
                properties.push(Property.RP)
            }
            else if (index == j + 1) {
                properties.push(Property.MP)
            }
            if (index < i) {
                properties.push(Property.Sorted)
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
                insertions: insertions,
                i: i,
                j: j
            }
        })
    }
    states.push({
        dialog: `Sorted array with ${comparisons} comparisons`,
        elements: inputArray.map((value: number) => {
            return {
                value: value,
                properties: [],
            }
        }),
        statistics: {
            comparisons: comparisons,
            insertions: insertions,
            i: -1,
            j: -1
        }
    })
    return states
}

const props: AlgoPageProps = {
    name: "Insertion Sort",
    overview: [
        "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time.",
        "It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
        "However, insertion sort provides several advantages:",
        "1. Simple implementation",
        "2. Efficient for (quite) small data sets, much like other quadratic sorting algorithms",
        "3. More efficient in practice than most other simple quadratic (i.e., O(n^2)) algorithms such as selection sort or bubble sort",
        "4. Adaptive, i.e., efficient for data sets that are already substantially sorted: the time complexity is O(nk) when each element in the input is no more than k places away from its sorted position",
        "5. Stable; i.e., does not change the relative order of elements with equal keys",
        "6. In-place; i.e., only requires a constant amount O(1) of additional memory space",
    ],
    implementations: implementations,
    complexity: complexity,
    sandbox: () => <ArraySortSandbox stateGenerator={insertionSortStateGenerator} name={"Insertion Sort"}/>
}

export default function InsertionSort() {
    return (
        <AlgoPage {...props}/>
    )
}
