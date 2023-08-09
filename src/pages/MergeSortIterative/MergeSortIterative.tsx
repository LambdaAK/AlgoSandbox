import { AlgoPage, AlgoPageProps, Implementation, Complexity } from "../../components/AlgoPage/AlgoPage";
import { ArraySandboxState, ArraySortSandbox } from "../../components/ArraySortSandbox/ArraySortSandbox";
import { ElementProps, Property } from "../../components/sandboxUtils/sandboxUtils";

const pythonCode: string =
`
def merge_sort(arr):
    n = len(arr)
    step = 1
    
    while step < n:
        for left in range(0, n - step, 2 * step):
            mid = left + step - 1
            right = min(left + 2 * step - 1, n - 1)
            merge(arr, left, mid, right)
        
        step *= 2

def merge(arr, left, mid, right):
    temp = []
    i = left
    j = mid + 1
    
    while i <= mid and j <= right:
        if arr[i] <= arr[j]:
            temp.append(arr[i])
            i += 1
        else:
            temp.append(arr[j])
            j += 1
    
    while i <= mid:
        temp.append(arr[i])
        i += 1
    
    while j <= right:
        temp.append(arr[j])
        j += 1
    
    for k in range(len(temp)):
        arr[left + k] = temp[k]
`

const javaCode: string =
`import java.util.Arrays;

public class MergeSort {
    public static void mergeSort(int[] arr) {
        int n = arr.length;
        int step = 1;
        
        while (step < n) {
            for (int left = 0; left < n - step; left += 2 * step) {
                int mid = left + step - 1;
                int right = Math.min(left + 2 * step - 1, n - 1);
                merge(arr, left, mid, right);
            }
            
            step *= 2;
        }
    }

    public static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }

        while (i <= mid) {
            temp[k++] = arr[i++];
        }

        while (j <= right) {
            temp[k++] = arr[j++];
        }

        System.arraycopy(temp, 0, arr, left, temp.length);
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7};
        mergeSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}
`

const cppCode: string =
`#include <algorithm>
using namespace std;

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int L[n1], R[n2];

    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void mergeSort(int arr[], int size) {
    for (int curr_size = 1; curr_size <= size - 1; curr_size *= 2) {
        for (int left_start = 0; left_start < size - 1; left_start += 2 * curr_size) {
            int mid = min(left_start + curr_size - 1, size - 1);
            int right_end = min(left_start + 2 * curr_size - 1, size - 1);
            merge(arr, left_start, mid, right_end);
        }
    }
}`

const jsCode: string =
`function merge(arr, left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

function mergeSort(arr) {
    const n = arr.length;
    let step = 1;

    while (step < n) {
        for (let left = 0; left < n - step; left += 2 * step) {
            let mid = left + step - 1;
            let right = Math.min(left + 2 * step - 1, n - 1);
            merge(arr, left, mid, right);
        }

        step *= 2;
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
    bestCaseTime: "O(n log(n))",
    averageCaseTime: "O(n log(n))",
    worstCaseTime: "O(n log(n))",
    bestCaseSpace: "O(n)",
    averageCaseSpace: "O(n)",
    worstCaseSpace: "O(n)"
}


export const mergeSortIterativeStateGenerator: Function = (arr: number[]): ArraySandboxState[] => {
    // other statistics
    let merges: number = 0
    const states: ArraySandboxState[] = []
    function merge(
        arr: number[], 
        auxArray: number[], 
        leftStart: number, 
        mid: number, 
        rightEnd: number) 
        {
        merges++
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
                    properties: properties,
                    statistics: {
                        merges: merges,
                        left: leftStart,
                        mid: mid,
                        right: rightEnd
                    }
                }
            })
        
        states.push({
            dialog: newDialog,
            elements: newElements,
            statistics: {
                merges: merges,
                left: leftStart,
                mid: mid,
                right: rightEnd
            }
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
                    properties: properties,
                    statistics: {
                        merges: merges,
                        left: leftStart,
                        mid: mid,
                        right: rightEnd
                    }
                }
            })

        states.push({
            dialog: newDialog2,
            elements: newElements2,
            statistics: {
                merges: merges,
                left: leftStart,
                mid: mid,
                right: rightEnd
            }
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
                elements: newElements,
                statistics: {
                    merges: merges,
                    left: leftStart,
                    mid: mid,
                    right: rightEnd
                }
            })
            merge(arr, auxArray, leftStart, mid, rightEnd);
        }
    }

    states.push({
        dialog: "Finished sorting",
        elements: arr.map((value: number) => {
            return {
                value: value,
                properties: [],
                
                
            }
        }),
        statistics: {
            merges: merges,
            left: -1,
            mid: -1,
            right: -1
        }
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
    sandbox: () => <ArraySortSandbox stateGenerator={mergeSortIterativeStateGenerator} name={"Merge Sort Iterative"}/>
}

export default function MergeSort() {
    return (
        <AlgoPage {...props} />
    )
}