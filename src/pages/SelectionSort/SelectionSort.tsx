import { AlgoPage, AlgoPageProps, Implementation, Complexity } from "../../components/AlgoPage/AlgoPage";


const pythonCode: string =
`
def selection_sort(arr):
    for i in range(len(arr)):
        min_index = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
`

const javaCode: string =
`
public static void selectionSort(int[] arr) {
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

const pythonImplentation: Implementation = {
    language: "Python",
    code: pythonCode
}

const javaImplentation: Implementation = {
    language: "Java",
    code: javaCode
}

const complexity: Complexity = {
    bestCaseTime: "O(n^2)",
    averageCaseTime: "O(n^2)",
    worstCaseTime: "O(n^2)",
    bestCaseSpace: "O(1)",
    averageCaseSpace: "O(1)",
    worstCaseSpace: "O(1)"
}

const props: AlgoPageProps = {
    name: "Selection Sort",
    overview:
    `
    Selection Sort is a straightforward comparison-based sorting algorithm that effectively sorts an array by dividing it into two regions: the sorted portion and the unsorted portion. The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion and moves it to the end of the sorted region. This process continues iteratively until the entire array becomes sorted.

    
    The Selection Sort algorithm efficiently works by iterating through the unsorted portion and finding the minimum (or maximum) element. Once identified, the algorithm swaps this element with the first element of the unsorted region. This operation effectively expands the sorted region by one element and reduces the unsorted region's size by one. The process then repeats, with each iteration adding one more element to the sorted section, until the entire array becomes sorted.
    
    
    `,
    implementations: [pythonImplentation, javaImplentation],
    complexity: complexity,
    sandbox: () => <div>Sandbox Component</div>
}

export default function SelectionSort() {
    return (
        <AlgoPage {...props}/>
    )
}