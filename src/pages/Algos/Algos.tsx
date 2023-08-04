import HomeButton from "../../components/homebutton/HomeButton"
import Home from "../Home/Home"
import Algo from "../../components/algo/Algo"
import "./Algos.css"

export default function Algos() {
    return (
    
        <>
            <HomeButton />
            <div className = "algos-container">
                <Algo
                    name = "Selection Sort"
                    desc = "Selects the smallest unsorted element and places it at the beginning."
                    icons = {["Sort", "Comparison", "Unstable Sort"]}
                />
                <Algo
                    name = "Insertion Sort"
                    desc = "Builds the sorted list incrementally by inserting elements in their correct order."
                    icons = {["Sort", "Comparison", "Stable Sort"]}
                />
                <Algo
                    name = "Merge Sort"
                    desc = "Divides the list into halves, sorts them, and then merges them back together."
                    icons = {["Sort", "Divide and Conquer", "Stable Sort"]}
                />
                <Algo
                    name = "Linear Search"
                    desc = "Sequentially scans the list to locate a target element."
                    icons = {["Search"]}
                />
                <Algo
                    name = "Binary Search"
                    desc = "Efficiently finds a target element in a sorted array by repeatedly halving the search space."
                    icons = {["Search", "Divide and Conquer", "Sorted Array"]}
                />
            </div>
        </>
    )
}