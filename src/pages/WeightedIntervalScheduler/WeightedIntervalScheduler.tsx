import { AlgoPage, AlgoPageProps, Complexity, Implementation } from "../../components/AlgoPage/AlgoPage"


const pythonCode: string = "placeholder"

const javaCode: string = "placeholder"

const cppCode: string = "placeholder"

const jsCode: string = "placeholder"

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
  bestCaseTime: "O(n)",
  averageCaseTime: "O(n)",
  worstCaseTime: "O(n)",
  bestCaseSpace: "O(n)",
  averageCaseSpace: "O(n)",
  worstCaseSpace: "O(n)"
}

function WeightedIntervalSchedulerSandbox() {
  return (
    <div>
      Weighted Interval Scheduler Sandbox
    </div>
  )
}

/*
interface Interval {
  a: number,
  b: number
}

interface WeightedIntervalSchedulerState {
  pValues: number[],
  OPTValues: number[],
  optimalSet: Interval[]

}

function weightedIntervalSchedulerStateGenerator(input: string): WeightedIntervalSchedulerState[] {

  return []
}
*/

const props: AlgoPageProps = {
  name: "Weighted Interval Scheduler",
  implementations: implementations,
  overview: [
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
    "placeholder",
  ],
  complexity: complexity,
  sandbox: () => <WeightedIntervalSchedulerSandbox />

}

export default function WeightedIntervalScheduler() {
  return (
    <AlgoPage {...props} />
  )
}