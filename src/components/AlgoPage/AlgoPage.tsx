import { useEffect, useState } from "react"
import "./AlgoPage.css"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AnimatePresence, motion } from "framer-motion";
import Nav from "../nav/Nav";

export const animationData: object = {
    initial: {
        opacity: 0,
        x: -100
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5, // Delay for the "in" animation
            duration: 0.5,
            ease: "easeInOut",
        },
        x: 0
    },
    exit: {
        opacity: 0,
        transition: { // out animation has no delay
            duration: 0.5,
            ease: "easeInOut",
        },
        x: 100
    }
}

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
    sandbox: any // a component
}

export enum PageState {
    Overview,
    Complexity,
    Implementations,
    Sandbox,
    Operations,
}

interface AlgoNavButtonProps {
    text: string,
    value: PageState,
    setter: Function,
    selected: PageState
}

interface AlgoHeaderProps {
    name: string
}

export function AlgoHeader(props: AlgoHeaderProps) {
    return (
        <div className="algo-header">
            {props.name}
        </div>
    )
}

export function AlgoNavButton(props: AlgoNavButtonProps) {

    return (
        <div className={
            (() => {
                if (props.value === props.selected) return "algo-nav-button-selected"
                else return "algo-nav-button"
            })()
        }
            onClick={() => props.setter(props.value)}>
            {props.text}
        </div>
    )
}

export function OverViewComponent(props: { overview: string[] }) {
    return (
        <motion.div
            className="algo-overview" {...animationData}>
            {
                props.overview.map(s => <li className="overview-sentence">{s}</li>)
            }
        </motion.div>
    )
}

export function ComplexityComponent(props: { complexity: Complexity }) {
    return (
        <motion.div className="algo-complexity" {...animationData}>
            Worst Case Time Complexity:
            <span className="complexity-formula">{props.complexity.worstCaseTime}</span>
            Average Case Time Complexity:
            <span className="complexity-formula">{props.complexity.averageCaseTime}</span>
            Best Case Time Complexity:
            <span className="complexity-formula">{props.complexity.bestCaseTime}</span>
            Worst Case Space Complexity:
            <span className="complexity-formula">{props.complexity.worstCaseSpace}</span>
            Average Case Space Complexity:
            <span className="complexity-formula">{props.complexity.averageCaseSpace}</span>
            Best Case Space Complexity:
            <span className="complexity-formula">{props.complexity.bestCaseSpace}</span>
        </motion.div>
    )
}


export function ImplementationsComponent(props: { implementations: Implementation[] }) {
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
        <motion.div {...animationData}>
            <motion.div className="algo-implementations">
                <div className="language-buttons">
                    {
                        props.implementations.map(i => <LanguageButton language={i.language} currentLanguage={language} setter={setLanguage} />)
                    }
                </div>
                <motion.div {...animationData}>
                    <SyntaxHighlighter language={language} style={materialDark} customStyle={{
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
        </motion.div>
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

        <div className={cssClass} onClick={() => props.setter(props.language)}>
            {props.language}
        </div>
    )
}

export function AlgoPage(props: AlgoPageProps) {

    const [pageState, setPageState] = useState<PageState>(PageState.Overview)

    return (
        <div className="algo-page">
            <Nav />
            <AlgoHeader name={props.name} />
            <div className="algo-nav">
                <AlgoNavButton text="Overview" value={PageState.Overview} setter={setPageState} selected={pageState} />
                <AlgoNavButton text="Complexity" value={PageState.Complexity} setter={setPageState} selected={pageState} />
                <AlgoNavButton text="Implementations" value={PageState.Implementations} setter={setPageState} selected={pageState} />
                <AlgoNavButton text="Sandbox" value={PageState.Sandbox} setter={setPageState} selected={pageState} />
            </div>
            <AnimatePresence>
                {pageState === PageState.Overview && <OverViewComponent overview={props.overview} key="0" />}
                {pageState === PageState.Complexity && <ComplexityComponent complexity={props.complexity} key="1" />}
                {pageState === PageState.Implementations && <ImplementationsComponent implementations={props.implementations} key="2" />}
                {pageState === PageState.Sandbox &&
                    <motion.div key="3" {...animationData}>
                        <props.sandbox {...props} />
                    </motion.div>}

            </AnimatePresence>
        </div>
    )
}