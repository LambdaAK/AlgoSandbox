import {AlgoPage, AlgoPageProps, Implementation, Complexity} from "../../components/AlgoPage/AlgoPage";

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
    sandbox: () => <div>Sandbox Component</div>
}

export default function InsertionSort() {
    return (
        <AlgoPage {...props}/>
    )
}
