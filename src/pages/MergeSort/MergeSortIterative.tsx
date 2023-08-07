import { AlgoPage, AlgoPageProps, Implementation, Complexity } from "../../components/AlgoPage/AlgoPage";
import { ArraySandboxState, ArraySortSandbox } from "../../components/ArraySortSandbox/ArraySortSandbox";
import { ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils";

const pythonCode: string =
`
def merge(left, right):
    result = []
    left_index, right_index = 0, 0

    while left_index < len(left) and right_index < len(right):
        if left[left_index] < right[right_index]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1

    result += left[left_index:]
    result += right[right_index:]
    return result

def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])

    return merge(left_half, right_half)

    
`

const javaCode: string =
`import java.util.Arrays;

public class MergeSort {

    public static void mergeSort(int[] arr) {
        if (arr.length <= 1) {
            return;
        }

        int mid = arr.length / 2;
        int[] left = Arrays.copyOfRange(arr, 0, mid);
        int[] right = Arrays.copyOfRange(arr, mid, arr.length);

        mergeSort(left);
        mergeSort(right);

        merge(arr, left, right);
    }

    private static void merge(int[] arr, int[] left, int[] right) {
        int leftIndex = 0;
        int rightIndex = 0;
        int mergedIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                arr[mergedIndex++] = left[leftIndex++];
            } else {
                arr[mergedIndex++] = right[rightIndex++];
            }
        }

        while (leftIndex < left.length) {
            arr[mergedIndex++] = left[leftIndex++];
        }

        while (rightIndex < right.length) {
            arr[mergedIndex++] = right[rightIndex++];
        }
    }
}
`

const cppCode: string =
`#include <vector>

using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    int leftSize = mid - left + 1;
    int rightSize = right - mid;

    vector<int> leftArray(leftSize);
    vector<int> rightArray(rightSize);

    for (int i = 0; i < leftSize; i++) {
        leftArray[i] = arr[left + i];
    }
    for (int j = 0; j < rightSize; j++) {
        rightArray[j] = arr[mid + 1 + j];
    }

    int i = 0, j = 0, k = left;
    while (i < leftSize && j < rightSize) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while (i < leftSize) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < rightSize) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}
`

const jsCode: string =
`
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const mergedArr = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            mergedArr.push(left[leftIndex]);
            leftIndex++;
        } else {
            mergedArr.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return mergedArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
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
    bestCaseTime: "O(n log(n))",
    averageCaseTime: "O(n log(n))",
    worstCaseTime: "O(n log(n))",
    bestCaseSpace: "O(n)",
    averageCaseSpace: "O(n)",
    worstCaseSpace: "O(n)"
}


const mergeSortStateGenerator: Function = (arr: number[]): ArraySandboxState[] => {
    const states: ArraySandboxState[] = []
    function merge(
        arr: number[], 
        auxArray: number[], 
        leftStart: number, 
        mid: number, 
        rightEnd: number) 
        {
        let left = leftStart;
        let right = mid + 1;
        let auxIndex = leftStart;


        const newDialog: string = `Merging from index ${leftStart} to ${rightEnd}`
        const newElements: ElementProps[] = arr
            .map((value: number, index: number) => {
                const properties: Property[] = []
                if (index >= leftStart && index <= mid) {
                    properties.push(Property.LP)
                } else if (index > mid && index <= rightEnd) {
                    properties.push(Property.RP)
                }
                return {
                    value: value,
                    properties: properties
                }
            })
        
        states.push({
            dialog: newDialog,
            elements: newElements
        })

        while (left <= mid && right <= rightEnd) {
          if (arr[left] <= arr[right]) {
            auxArray[auxIndex] = arr[left];
            left++;
          } else {
            auxArray[auxIndex] = arr[right];
            right++;
          }
          auxIndex++;
        }
      
        while (left <= mid) {
          auxArray[auxIndex] = arr[left];
          left++;
          auxIndex++;
        }
      
        while (right <= rightEnd) {
          auxArray[auxIndex] = arr[right];
          right++;
          auxIndex++;
        }
      
        for (let i = leftStart; i <= rightEnd; i++) {
          arr[i] = auxArray[i];
        }

        // add state
        const newDialog2: string = `Merged from index ${leftStart} to ${rightEnd}`
        const newElements2: ElementProps[] = arr
            .map((value: number, index: number) => {
                const properties: Property[] = []
                if (index >= leftStart && index <= rightEnd) {
                    properties.push(Property.LP)
                }
                return {
                    value: value,
                    properties: properties
                }
            })

        states.push({
            dialog: newDialog2,
            elements: newElements2
        })
      }

    const n = arr.length;
    const auxArray = new Array(n);
    
    for (let size = 1; size < n; size *= 2) {
        for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size - 1, n - 1);
            const rightEnd = Math.min(leftStart + 2 * size - 1, n - 1);

            // new state (splitting)
            const newDialog: string = `Spliting [${leftStart}, ${rightEnd}] into [${leftStart}, ${mid}] and [${mid + 1}, ${rightEnd}]`
            const newElements: ElementProps[] = arr
                .map((value: number, index: number) => {
                    const properties: Property[] = []
                    if (index >= leftStart && index <= mid) {
                        properties.push(Property.LP)
                    } else if (index > mid && index <= rightEnd) {
                        properties.push(Property.RP)
                    }
                    return {
                        value: value,
                        properties: properties
                    }
                })
            states.push({
                dialog: newDialog,
                elements: newElements
            })
            merge(arr, auxArray, leftStart, mid, rightEnd);
        }
    }

    states.push({
        dialog: "Finished",
        elements: arr.map((value: number) => {
            return {
                value: value,
                properties: []
            }
        })
    })
    
    return states
}


const props: AlgoPageProps = {
    name: "Merge Sort Iterative",
    implementations: implementations,
    overview: [
        "Divides the list into halves, sorts them, and then merges them back together.",
        "Uses a divide and conquer approach.",
        "The base case is when the list has 0 or 1 elements.",
        "The recursive step is to split the list into two halves, sort them, and then merge them back together.",
        "The merge step is to compare the first elements of the two sorted halves and add the smaller one to the result.",
        "Repeat until one of the halves is empty, then add the remaining elements of the other half to the result.",
        "The merge step is the most complex part of the algorithm.",
        "The time complexity is O(n log(n)) for all cases.",
        "The space complexity is O(n) for all cases."
    ],
    complexity: complexity,
    sandbox: () => <ArraySortSandbox stateGenerator={mergeSortStateGenerator} name={"Merge Sort"}/>
}

export default function MergeSort() {
    return (
        <AlgoPage {...props} />
    )
}