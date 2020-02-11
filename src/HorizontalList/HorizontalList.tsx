import * as React from "react";
import GridElement from "../gridElement/gridItem";


const HorizontalList = (props: any) => {

    const grid = [...Array(props.column)].map((_, column) => {
            return (<GridElement id={`grid${props.row}${column}`} key={column} column={props.row} {...props}>{column}</GridElement>)
    });


    return <>{grid}</>
};

export default HorizontalList;
