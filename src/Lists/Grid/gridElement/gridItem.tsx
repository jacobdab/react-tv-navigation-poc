import * as React from "react";

const GridElement = (props: any) => {
    const calculateElementsInRow = (window.outerWidth - 300) / props.column - 20;

    return (<div id={props.id} style={{width: calculateElementsInRow}} className={'gridElement'}>
        {props.children}
    </div>)
}

export default GridElement
