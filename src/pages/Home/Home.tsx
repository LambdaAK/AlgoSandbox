import { motion } from "framer-motion"
import "./Home.css"
import Nav from "../../components/nav/Nav"

function Title() {
    return (
        <motion.div
            className = "title"
            initial = {{
                y: -250,
                opacity: 0
            }}
            animate = {{
                y: 0,
                opacity: 100
            }}
            transition = {{
                type: "spring",
                stiffness: 400,
                delay: 0.25
            }}
        >
            AlgoSandbox
        </motion.div>
    )
}

function Desc() {
    return (
        <motion.div
            className = "desc"
            initial = {{
                opacity: 0
            }}
            animate = {{
                opacity: 100,
            }}
            transition = {{
                delay: 0.5,
                duration: 1.5
            }}

        >
            A resource for learning about algorithms and data structures in a fun and interactive way
        </motion.div>
    )
}

function AlgosLink() {
    return (
        <motion.a 
            href="/algos" 
            className = "algos-link"
            initial = {{
                y: -500,
                opacity: 0
            }}
            animate = {{
                y: 0,
                opacity: 100
            }}
            transition = {{
                type: "spring",
                delay: 1.5,
                stiffness: 1000,
                duration: 1.5
            }}
        >
            Algorithms
        </motion.a>
    )
}


export default function Home() {
    return (
        <div className = "home-container">
            <Nav/>
            <Title />
            <Desc />
        </div>
    )
}