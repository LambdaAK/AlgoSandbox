import { useEffect, useState } from "react"
import "./AlgoPage.css"
import HomeButton from "../homebutton/HomeButton"
import Prism from "prismjs"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco, nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AnimatePresence, motion } from "framer-motion";
import { ArrayDisplay, ArraySearhSandbox, Property } from "../ArraySearchSandbox/ArraySearchSandbox";



export interface Complexity {
	bestCaseTime: string,
	averageCaseTime: string,
	worstCaseTime: string,
	bestCaseSpace: string,
	averageCaseSpace: string,
	worstCaseSpace: string,
}

export interface Implementation {
	language: string,
	code: string
}

export interface AlgoPageProps {
    name: string,
	overview: string[],
	implementations: Implementation[],
	complexity: Complexity,
	sandbox: Function // a component
}

enum AlgoPageState {
    Overview,
    Complexity,
    Implementations,
    Sandbox
}

interface AlgoNavButtonProps {
    text: string,
    value: AlgoPageState,
    setter: Function
}

function AlgoHeader(props: AlgoPageProps) {
    return (
        <div className = "algo-header">
            {props.name}
        </div>
    )
}

function AlgoNavButton(props: AlgoNavButtonProps) {
    return (
        <div className = "algo-nav-button" onClick = {() => props.setter(props.value)}>
            {props.text}
        </div>
    )
}

function OverViewComponent(props: AlgoPageProps) {
    return (
        <div className = "algo-overview">
            {
                props.overview.map(s => <li className = "overview-sentence">{s}</li>)
            }
        </div>
    )
}

function ComplexityComponent(props: AlgoPageProps) {
    return (
        <div className = "algo-complexity">
            Worst Case Time Complexity:
            <span className = "complexity-formula">{props.complexity.worstCaseTime}</span>
            Average Case Time Complexity:  
            <span className = "complexity-formula">{props.complexity.averageCaseTime}</span>
            Best Case Time Complexity:
            <span className = "complexity-formula">{props.complexity.bestCaseTime}</span>
            Worst Case Space Complexity:
            <span className = "complexity-formula">{props.complexity.worstCaseSpace}</span> 
            Average Case Space Complexity:
            <span className = "complexity-formula">{props.complexity.averageCaseSpace}</span>
            Best Case Space Complexity:
            <span className = "complexity-formula">{props.complexity.bestCaseSpace}</span>
        </div>
    )
}


function ImplementationsComponent(props: AlgoPageProps) {
    const [language, setLanguage] = useState<string>("python")
    const [code, setCode] = useState<string>("")

    const [width, setWidth] = useState<number>(window.innerWidth)

    addEventListener("resize", () => {
        setWidth(window.innerWidth)
    })

    useEffect(() => {
        // get the code for the language
        const implementation: Implementation | undefined = props.implementations.find(i => i.language === language)
        if (implementation) {
            setCode(implementation.code)
        }
        
    }, [language])


    return (
        <>
        <motion.div className = "algo-implementations">
            <div className = "language-buttons">
                {
                    props.implementations.map(i => <LanguageButton language = {i.language} currentLanguage = {language} setter = {setLanguage}/>)
                }
            </div>
            <motion.div
                initial = {{
                    opacity: 0,
                    x: 100
                }}
                animate = {{
                    opacity: 1,
                    x: 0
                }}
                transition = {{
                    duration: 0.5
                }}
                exit = {{
                    opacity: 0,
                    x: -100
                }}
            >
                <SyntaxHighlighter language = {language} style = {materialDark} customStyle={{
                                    borderRadius: "8px",
                                    boxShadow: "0 30px 30px hsla(0, 0%, 0%, 0.25)",
                                    fontSize: (() => {
                                        if (width < 400) {
                                            return "0.3rem"
                                        }
                                        else if (width < 768) {
                                            return "0.7rem"
                                        }
                                        return "1.2rem"
                                    })()
                                }}>
                                {code}
                                </SyntaxHighlighter>
            </motion.div>
        </motion.div>
        </>
    )
}

interface LanguageButtonProps {
    language: string,
    currentLanguage: string,
    setter: Function
}
function LanguageButton(props: LanguageButtonProps) {
    const cssClass: string = (() => {
        if (props.language === props.currentLanguage) {
            return "language-button-selected"
        }
        return "language-button"
    })()
    return (
        
        <div className = {cssClass} onClick = {() => props.setter(props.language)}>
            {props.language}
        </div>
    )
}

function Test() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const toggle = () => setIsVisible(!isVisible)

    return (
        <>
        <button onClick = {toggle}>Toggle</button>
        <AnimatePresence>
            {
                (() => {
                    if (isVisible) {
                        return (
                            <motion.div
                            initial = {{
                                opacity: 0,
                                x: 100
                            }}
                            animate = {{
                                opacity: 1,
                                x: 0
                            }}
                            transition = {{
                                duration: 0.5
                            }}
                            key = "a"
                            exit = {{
                                opacity: 0,
                                x: -100
                            }}
                            >
                                aegaegaegaegaeg
                            </motion.div>

                        )
                    }
                    else {
                        <div></div>
                    }
                })()
            }
        </AnimatePresence>
        </>
    )
}


export function AlgoPage(props: AlgoPageProps) {

    const [pageState, setPageState] = useState<AlgoPageState>(AlgoPageState.Overview)

    return (
        <AnimatePresence>
        <div className = "algo-page">
            <HomeButton/>
            <AlgoHeader {...props}/>
            <div className = "algo-nav">
                <AlgoNavButton text = "Overview" value = {AlgoPageState.Overview} setter = {setPageState}/>
                <AlgoNavButton text = "Complexity" value = {AlgoPageState.Complexity} setter = {setPageState}/>
                <AlgoNavButton text = "Implementations" value = {AlgoPageState.Implementations} setter = {setPageState}/>
                <AlgoNavButton text = "Sandbox" value = {AlgoPageState.Sandbox} setter = {setPageState}/>
            </div>
            {
                (() => {
                    switch (pageState) {
                        case AlgoPageState.Overview:
                            return <OverViewComponent {...props}/>
                        case AlgoPageState.Complexity:
                            return <ComplexityComponent {...props}/>
                        case AlgoPageState.Implementations:
                            return <ImplementationsComponent {...props}/>
                        case AlgoPageState.Sandbox:
                            return props.sandbox()
                    }
                })()
            }
        
        </div>

        </AnimatePresence>
    )
}