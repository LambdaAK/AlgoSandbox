import "./sandboxUtils.css"

export enum Property {
    Primary,
    Secondary,
    Highlight,
    LP,
    RP,
    MP,
    Sorted
}

export interface DialogBoxProps {
    content: string
}

export function DialogBox(props: DialogBoxProps) {
    return (
        <div className = "dialog-box">
            {props.content}
        </div>
    )
}

export interface ElementProps {
    value: number,
    properties: Property[]
}

export interface ArrayDisplayProps {
    elements: ElementProps[]
}

export function ArrayDisplay(props: ArrayDisplayProps) {
    return (
        <div className = "array-display">
            {
                props.elements.map(e => <Element value = {e.value} properties = {e.properties}/>)
            }
        </div>
    )
}

function Element(props: ElementProps) {
    // TODO: add the properties to the element
    const css: string = props.properties.map(p => {
        switch (p) {
            case Property.Primary:
                return "primary"
            case Property.Secondary:
                return "secondary"
            case Property.Highlight:
                return "highlight"
            case Property.LP:
                return "left-pointer"
            case Property.RP:
                return "right-pointer"
            case Property.MP:
                return "middle-pointer"
            case Property.Sorted:
                return "sorted"
        }
    }).join(" ")

    return (
        <div className = {css + " element"}>
            {props.value}
        </div>
    )
}

export function RunButton() {
    return (
        <button id = "run-button" className = "run-button">
            Run
        </button>
    )
}

export function ArrayInput() {
    return (
        <input
            id = "array-input"
            className = "array-input"
            type = "text"
            placeholder = "Input Array"
        >

        </input>
    )
}

export function DelaySetter() {
    return (
        <>
            <div className = "delay-header">
                Speed
            </div>
            <input
                id = "delay-input"
                className = "delay-input"
                type = "range"
            ></input>
        </>
    )
}

export function getDelay(n: number): number {
    if (n >= 0 && n <= 50) {
      return 5000 - (80 * n);
    } else if (n > 50 && n <= 75) {
      return 1000 - (20 * (n - 50));
    } else if (n > 75 && n <= 87.5) {
      return 500 - (10 * (n - 75));
    } else if (n > 87.5 && n <= 100) {
      return 250 - (5 * (n - 87.5));
    } else {
      return 0;
    }
  }
  
