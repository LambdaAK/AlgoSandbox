import HomeButton from "../../components/homebutton/HomeButton"
import Home from "../Home/Home"
import Algo from "../../components/algo/Algo"
import "./Algos.css"
import Nav from "../../components/nav/Nav"
import SortText, { Sort, Order, Size } from "../../components/SortText/SortText"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"



function Search() {
    return (
        <input type="text" className = "search" placeholder = "Search"></input>
    )
}

function TagsModal(props: {setOpen: (open: boolean) => void, open: boolean}) {

    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const inside = (
        <motion.div className = "tags-modal"
            initial = {{
                opacity: 0,
                y: -100
            }}
            animate = {{
                opacity: 1,
                y: 0
            }}
            exit = {{
                opacity: 0,
                y: 100
            }}
        >
            <div className = "tags-modal-exit-button"
            onClick = {
                () => {
                    props.setOpen(false)
                }
            }
            >
                Exit
            </div>
            <div style = {
                {
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "1rem",
                }
            }>
                {
                    tags.map((tag: string) => {
                        return (
                            <Tag tagName = {tag}/>
                        )
                    })
                }
            </div>
        </motion.div>
    )

    return (
        <AnimatePresence>
            {
                props.open && inside
            }
        </AnimatePresence>
    )
}

const tags: string[] = [
    "Sort",
    "Search",
    "Divide and Conquer",
    "Comparison",
    "Stable Sort",
    "Unstable Sort",
    "Binary Search"
]

function TagsButton(props: {toggleTagsOpen: () => void}) {
    return (
        <div className = "tags-button"
            onClick = {
                () => props.toggleTagsOpen()
            }
        >
            Tags
        </div>
    )
}

function Tag(props: {tagName: string}) {
    const [selected, setSelected] = useState(false)
    return (
        <div className = {"tag " + (() => {
            if (selected) return "tag-selected"
            else return ""
        })()}
            onClick = {
                () => {
                    setSelected(!selected)
                }
            }
        >
            {props.tagName}
        </div>
    )
}


interface AlgoInfo {
    name: string,
    desc: string,
    icons: string[],
    dir: string
}

const algoInfos: AlgoInfo[] = [
    {
        name: "Selection Sort",
        desc: "Selects the smallest unsorted element and places it at the beginning.",
        icons: ["Sort", "Comparison", "Unstable Sort"],
        dir: "/selectionsort"
    },
    {
        name: "Insertion Sort",
        desc: "Builds the sorted list incrementally by inserting elements in their correct order.",
        icons: ["Sort", "Comparison", "Stable Sort"],
        dir: "/insertionsort"
    },
    {
        name: "Merge Sort Iterative",
        desc: "Divides the list into halves, sorts them, and then merges them back together.",
        icons: ["Sort", "Divide and Conquer", "Stable Sort"],
        dir: "/mergesortiterative"
    },
    {
        name: "Merge Sort",
        desc: "Divides the list into halves, sorts them, and then merges them back together.",
        icons: ["Sort", "Divide and Conquer", "Stable Sort"],
        dir: "/mergesort"

    },
    {
        name: "Bubble Sort",
        desc: "Repeatedly swaps adjacent elements if they are in the wrong order.",
        icons: ["Sort", "Comparison", "Stable Sort"],
        dir: "/bubblesort"
    },
    {
        name: "Linear Search",
        desc: "Sequentially scans the list to locate a target element.",
        icons: ["Search"],
        dir: "/linearsearch"
    },
    {
        name: "Left Bisect",
        desc: "Efficiently finds the first occurence of a target element in a sorted array by repeatedly halving the search space.",
        icons: ["Search", "Divide and Conquer", "Binary Search"],
        dir: "/leftbisect"
    },
    {
        name: "Right Bisect",
        desc: "Efficiently finds the last occurence of a target element in a sorted array by repeatedly halving the search space.",
        icons: ["Search", "Divide and Conquer", "Binary Search"],
        dir: "/rightbisect"
    }
]

algoInfos.sort((a: AlgoInfo, b: AlgoInfo) => {
    if (a.name < b.name) {
        return -1
    }
    else if (a.name > b.name) {
        return 1
    }
    else {
        return 0
    }
})

export default function Algos() {
    const [tagsOpen, setTagsOpen] = useState(false)
    return (
        <>
        <Nav/>
        <div style = {
                {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    marginLeft: "2rem"
                }
            }>
                <Search/>
                <TagsButton toggleTagsOpen={
                    () => setTagsOpen(!tagsOpen)
                }/>
            </div>
        <div className = {"algos-page " + (() => {
            if (tagsOpen) return "algos-page-modal-activated"
            else return ""
        })()}>
        
            <div className = "algos-container">
                {
                    algoInfos.map((algoInfo: AlgoInfo) => {
                        return (
                            <Algo name = {algoInfo.name} desc = {algoInfo.desc} icons = {algoInfo.icons} dir = {algoInfo.dir}/>
                        )
                    })
                }
            </div>
            
        </div>
        <TagsModal
            open = {tagsOpen}
            setOpen = {
                (open: boolean) => setTagsOpen(open)
            }
        />
        </>
    )
}

