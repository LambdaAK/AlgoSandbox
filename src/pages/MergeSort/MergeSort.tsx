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


export function mergeSortStateGenerator(arr: number[]): ArraySandboxState[] {
    const states: ArraySandboxState[] = [];
    let merges: number = 0
    function merge(arr: number[], start: number, mid: number, end: number) {
        merges++
        const leftSubarray = arr.slice(start, mid + 1);
        const rightSubarray = arr.slice(mid + 1, end + 1);

        // add state
        const dialog: string = `Merging [${start}, ${mid}] and [${mid + 1}, ${end}]`;
        const elements: ElementProps[] = arr
            .map((value: number, index: number) => {
                const properties: Property[] = []
                if (index >= start && index <= mid) {
                    properties.push(Property.LP)
                }
                else if (index >= mid + 1 && index <= end) {
                    properties.push(Property.RP)
                }
                return {
                    value: value,
                    properties: properties
                }
            })
        states.push({
            dialog: dialog,
            elements: elements,
            statistics: {
                merges: merges,
                start: start,
                mid: mid,
                end: end
            }
        })
      
        let leftIndex = 0;
        let rightIndex = 0;
        let arrIndex = start;
      
        while (leftIndex < leftSubarray.length && rightIndex < rightSubarray.length) {
          if (leftSubarray[leftIndex] <= rightSubarray[rightIndex]) {
            arr[arrIndex] = leftSubarray[leftIndex];
            leftIndex++;
          } else {
            arr[arrIndex] = rightSubarray[rightIndex];
            rightIndex++;
          }
          arrIndex++;
        }
      
        while (leftIndex < leftSubarray.length) {
          arr[arrIndex] = leftSubarray[leftIndex];
          leftIndex++;
          arrIndex++;
        }
      
        while (rightIndex < rightSubarray.length) {
          arr[arrIndex] = rightSubarray[rightIndex];
          rightIndex++;
          arrIndex++;
        }

        // add state
        const dialog2: string = `Merged [${start}, ${mid}] and [${mid + 1}, ${end}]`
        const elements2: ElementProps[] = arr
            .map((value: number, index: number) => {
                const properties: Property[] = []
                if (index >= start && index <= end) {
                    properties.push(Property.Primary)
                }
                return {
                    value: value,
                    properties: properties
                }
            })
        states.push({
            dialog: dialog2,
            elements: elements2,
            statistics: {
                merges: merges,
                start: start,
                mid: mid,
                end: end
            }
        })
      }
      
      function mergeSort(arr: number[], start = 0, end = arr.length - 1) {
        if (start >= end) {
          return;
        }
      
        const mid = Math.floor((start + end) / 2);
        
        const newDialog: string = `Splitting [${start}, ${end}] into [${start}, ${mid}] and [${mid + 1}, ${end}]`
        const newElements: ElementProps[] = arr
            .map((value: number, index: number) => {
                const properties: Property[] = []
                if (index >= start && index <= mid) {
                    properties.push(Property.Primary)
                }
                else if (index >= mid + 1 && index <= end) {
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
                merges: merges,
                start: start,
                mid: mid,
                end: end
            }
        })
        mergeSort(arr, start, mid);
        // add state
        const newDialog2: string = `Sorted [${start}, ${mid}]`
        const newElements2: ElementProps[] = arr
            .map((value: number, index: number) => {
                const properties: Property[] = []
                if (index >= start && index <= mid) {
                    properties.push(Property.LP)
                }
                return {
                    value: value,
                    properties: properties
                }
            })
        states.push({
            dialog: newDialog2,
            elements: newElements2,
            statistics: {
                merges: merges,
                start: start,
                mid: mid,
                end: end
            }
        })
        
        mergeSort(arr, mid + 1, end);
        // add state
        const newDialog3: string = `Sorted [${mid + 1}, ${end}]`
        const newElements3: ElementProps[] = arr
            .map((value: number, index: number) => {
                const properties: Property[] = []
                if (index >= mid + 1 && index <= end) {
                    properties.push(Property.LP)
                }
                return {
                    value: value,
                    properties: properties
                }
            })
        states.push({
            dialog: newDialog3,
            elements: newElements3,
            statistics: {
                merges: merges,
                start: start,
                mid: mid,
                end: end
            }
        })
      
        merge(arr, start, mid, end);
      }

    mergeSort(arr);
    states.push({
        dialog: `Finished sorting with ${merges} merges`,
        elements: arr.map((value: number) => {
            return {
                value: value,
                properties: []
            }
        }),
        statistics: {
            merges: merges,
            start: -1,
            mid: -1,
            end: -1
        }
    })
    return states
        
}

const props: AlgoPageProps = {
    name: "Merge Sort",
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