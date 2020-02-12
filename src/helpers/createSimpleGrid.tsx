import * as React from "react";

import GridElement from "../Lists/Grid/gridElement/gridItem";
import {ReactElement} from "react";


export const createSimpleGrid = (row: number, column: number , props: any): ReactElement => {

   const calculateTotalElements = row * column;

   const grid = [...Array(calculateTotalElements)].map((_,i) => {
       return (<GridElement id={`grid${i}`} row={row} {...props}>{i}</GridElement>)
   })

    return (<div style={{marginLeft: '300px'}}>
        {grid}
    </div>)

}
