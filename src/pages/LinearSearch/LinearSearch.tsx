import { AlgoPage, AlgoPageProps, Implementation, Complexity } from "../../components/AlgoPage/AlgoPage";

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
    sandbox: () => <div>Sandbox Component</div>
}

export default function LinearSearch() {
    return (
        <AlgoPage {...props} />
    )
}