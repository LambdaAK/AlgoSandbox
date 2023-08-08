
import { AlgoPage, AlgoPageProps, Implementation, Complexity } from "../../components/AlgoPage/AlgoPage";
import { ArraySearchSandbox, ArraySearchSandboxState } from "../../components/ArraySearchSandbox/ArraySearchSandbox";
import { ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils";

const pythonCode: string =
`def right_bisect(arr, x):
left, right = 0, len(arr)

while left < right:
    mid = left + (right - left) // 2
    
    if arr[mid] > x:
        right = mid
    else:
        left = mid + 1
        
return left
`         

const javaCode: string =
`public class RightBisect {
    public static int rightBisect(int[] arr, int x) {
        int left = 0;
        int right = arr.length;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] > x) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    }
}
`

const cppCode: string =
`using namespace std;

int rightBisect(int arr[], int size, int x) {
    int left = 0;
    int right = size;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] > x) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}
`

const jsCode: string =
`function rightBisect(arr, x) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] > x) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
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

function rightBisectStateGenerator(inputArray: number[], target: number): ArraySearchSandboxState[] {
    const states: ArraySearchSandboxState[] = []

    if (!isSorted(inputArray)) {
        states.push(
            {
                dialog: "The input array must be sorted.",
                elements: []   
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
            elements: newElements
        }

        states.push(newState)

        if (mVal > target) {
            rp = mp
        }
        else {
            lp = mp + 1
        }
    }

    // add the final state
    if (lp > 0 && inputArray[lp - 1] == target) {
        const newDialog: string = `Found rightmost occurence of target value ${target} at index ${lp}.`
        const newElements: ElementProps[] = inputArray.map((val: number, index: number) => {
            if (index == lp - 1) {
                return {
                    value: val,
                    properties: [Property.Primary]
                }
            }
            if (index == lp) {
                return {
                    value: val,
                    properties: [Property.Secondary]
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
            elements: newElements
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
            elements: newElements
        })
    }
    
    return states

}

const RightBisectSandbox = () => {
    return (
        <ArraySearchSandbox name = "Linear Search" stateGenerator = {rightBisectStateGenerator} />
    )
}


const props: AlgoPageProps = {
    name: "RightBisect",
    overview: [
        "RightBisect is a binary search algorithm that returns the rightmost index of a target value in a sorted array.",
        "If the target value is not in the array, it returns -1."
    ],
    implementations: implementations,
    complexity: complexity,
    sandbox: () => <RightBisectSandbox/>
}

export default () => <AlgoPage {...props} />
