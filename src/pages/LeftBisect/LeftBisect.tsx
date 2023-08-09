import { AlgoPage, AlgoPageProps, Implementation, Complexity } from "../../components/AlgoPage/AlgoPage";
import { ArraySearchSandbox, ArraySearchSandboxState } from "../../components/ArraySearchSandbox/ArraySearchSandbox";
import { ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils";

const pythonCode: string =
`def left_bisect(arr, target):
    left = 0
    right = len(arr) - 1
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    if arr[left] == target:
        return left
    else:
        return -1
`

const javaCode: string =
`public static int leftBisect(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    while (left < right) {
        int mid = (left + right) / 2;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    if (arr[left] == target) return left;
    else return -1;
`

const cppCode: string =
`#include <iostream>
using namespace std;

int leftBisect(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    while (left < right) {
        int mid = (left + right) / 2;
        if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid;
        }
    }
    if (arr[left] == target) return left;
    else return -1;
`

const jsCode: string =
`function leftBisect(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid;
        }
    }
    if (arr[left] == target) return left;
    else return -1;
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
    worstCaseTime: "O(log n)",
    averageCaseTime: "O(log n)",
    bestCaseTime: "O(1)",
    worstCaseSpace: "O(1)",
    averageCaseSpace: "O(1)",
    bestCaseSpace: "O(1)"
}

function isSorted(inputArray: number[]): boolean {
    for (let i = 1; i < inputArray.length; i++) {
        if (inputArray[i] < inputArray[i - 1]) {
            return false
        }
    }
    return true
}

function leftBisectStateGenerator(inputArray: number[], target: number): ArraySearchSandboxState[] {
    let comparisons: number = 0
    const states: ArraySearchSandboxState[] = []

    if (!isSorted(inputArray)) {
        states.push(
            {
                dialog: "The input array must be sorted.",
                elements: [],
                statistics: {
                    comparisons: -1,
                    left: -1,
                    mid: -1,
                    right: -1,
                    "search space": -1
                }
            }
        )
        return states
    }

    const targetIndex: number = inputArray.indexOf(target) // leftmost index of target


    let lp = 0
    let rp = inputArray.length - 1

    while (lp < rp) {
        let mp = Math.floor((lp + rp) / 2)
        let mVal = inputArray[mp]

        // add the current state

        const newDialog: string = `Left pointer: ${lp}, Right pointer: ${rp}, Mid pointer: ${mp}, Mid value: ${mVal}`
        const newElements: ElementProps[] = inputArray.map((val: number, index: number) => {
            if (index == lp) {
                return {
                    value: val,
                    properties: [Property.LP]
                }
            }
            else if (index == rp) {
                return {
                    value: val,
                    properties: [Property.RP]
                }
            }
            else if (index == mp) {
                return {
                    value: val,
                    properties: [Property.MP]
                }
            }
            else if (index == targetIndex) {
                return {
                    value: val,
                    properties: [Property.Highlight]
                }
            }
            else {
                return {
                    value: val,
                    properties: []
                }
            }
        })
        const newState: ArraySearchSandboxState = {
            dialog: newDialog,
            elements: newElements,
            statistics: {
                comparisons: comparisons,
                left: lp,
                mid: mp,
                right: rp,
                "search space": rp - lp + 1
            }
        }

        states.push(newState)

        comparisons++
        if (mVal < target) {
            lp = mp + 1
        }
        else {
            rp = mp
        }
    }

    // add the final state
    if (inputArray[lp] == target) {
        const newDialog: string = `Found first occurence of target value ${target} at index ${lp}.`
        const newElements: ElementProps[] = inputArray.map((val: number, index: number) => {
            if (index == lp) {
                return {
                    value: val,
                    properties: [Property.Highlight]
                }
            }
            else {
                return {
                    value: val,
                    properties: []
                }
            }
        })
        states.push({
            dialog: newDialog,
            elements: newElements,
            statistics: {
                comparisons: comparisons,
                left: lp,
                mid: Math.floor((lp + rp) / 2),
                right: rp,
                "search space": rp - lp + 1
            }
        })
    }
    else {
        const newDialog: string = `Target value ${target} not found.`
        const newElements: ElementProps[] = inputArray.map((val: number, index: number) => {
            return {
                value: val,
                properties: []
            }
        })
        states.push({
            dialog: newDialog,
            elements: newElements,
            statistics: {
                comparisons: comparisons,
                left: lp,
                mid: Math.floor((lp + rp) / 2),
                right: rp,
                "search space": rp - lp + 1
            }
        })
    }
    
    return states

}

const LeftBisectSandbox = () => {
    return (
        <ArraySearchSandbox name = "Linear Search" stateGenerator = {leftBisectStateGenerator} />
    )
}


const props: AlgoPageProps = {
    name: "LeftBisect",
    overview: [
        "LeftBisect is a binary search algorithm that returns the leftmost index of a target value in a sorted array.",
        "If the target value is not in the array, it returns -1."
    ],
    implementations: implementations,
    complexity: complexity,
    sandbox: () => <LeftBisectSandbox/>
}

export default () => <AlgoPage {...props} />
