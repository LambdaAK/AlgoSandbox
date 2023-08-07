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