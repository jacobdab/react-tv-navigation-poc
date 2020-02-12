import * as React from "react";
import GridElement from "../Grid/gridElement/gridItem";


const HorizontalList = (props: any) => {

    const grid = [...Array(props.column)].map((_, index) => {
        console.log(index * props.row);
            return (<GridElement id={`grid${index}`} key={index} column={props.row} {...props}>{index}</GridElement>)
    });


    return <>{grid}</>
};

export default HorizontalList;
