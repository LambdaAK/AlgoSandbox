import HomeButton from "../../components/homebutton/HomeButton"
import Home from "../Home/Home"
import Algo from "../../components/algo/Algo"
import "./Algos.css"
import Nav from "../../components/nav/Nav"
import SortText, { Sort, Order, Size } from "../../components/SortText/SortText"

export default function Algos() {
    return (
        <>
            <Nav/>
            <div className = "algos-container">
                <Algo
                    name = "Selection Sort"
                    desc = "Selects the smallest unsorted element and places it at the beginning."
                    icons = {["Sort", "Comparison", "Unstable Sort"]}
                    dir = "/selectionsort"
                />
                <Algo
                    name = "Insertion Sort"
                    desc = "Builds the sorted list incrementally by inserting elements in their correct order."
                    icons = {["Sort", "Comparison", "Stable Sort"]}
                    dir = "/insertionsort"
                />
                <Algo
                    name = "Merge Sort Iterative"
                    desc = "Divides the list into halves, sorts them, and then merges them back together."
                    icons = {["Sort", "Divide and Conquer", "Stable Sort"]}
                    dir = "/mergesortiterative"
                />
                <Algo
                    name = "Merge Sort"
                    desc = "Divides the list into halves, sorts them, and then merges them back together."
                    icons = {["Sort", "Divide and Conquer", "Stable Sort"]}
                    dir = "/mergesort"
                />
                <Algo
                    name = "Bubble Sort"
                    desc = "Repeatedly swaps adjacent elements if they are in the wrong order."
                    icons = {["Sort", "Comparison", "Stable Sort"]}
                    dir = "/bubblesort"
                />
                <Algo
                    name = "Linear Search"
                    desc = "Sequentially scans the list to locate a target element."
                    icons = {["Search"]}
                    dir = "/linearsearch"
                />
                <Algo
                    name = "Left Bisect"
                    desc = "Efficiently finds the first occurence of a target element in a sorted array by repeatedly halving the search space."
                    icons = {["Search", "Divide and Conquer", "Binary Search"]}
                    dir = "/leftbisect"
                />
                <Algo
                    name = "Right Bisect"
                    desc = "Efficiently finds the last occurence of a target element in a sorted array by repeatedly halving the search space."
                    icons = {["Search", "Divide and Conquer", "Binary Search"]}
                    dir = "/rightbisect"
                />
            </div>
        </>
    )
}