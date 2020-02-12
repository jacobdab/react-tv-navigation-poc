import * as React from "react";
import HorizontalList from '../HorizontalList/HorizontalList';
import {storeContentElements} from "../../redux/navigation/actions";
import {connect} from "react-redux";

import './Grid.scss'
import {useEffect} from "react";
import GridElement from "./gridElement/gridItem";

const Grid = (props: any) => {
    let gridElements: HTMLDivElement | null;
    const howManyElements = props.row * props.column;

    const grid = [...Array(howManyElements)].map((_, index) => {
            return (<GridElement id={`grid${index}`} key={index} column={props.row} {...props}>{index}</GridElement>)
        });

    useEffect(() => {
        gridElements && props.storeGridElements(gridElements);
    }, []);

    return (<div className={props.className} ref={ref => gridElements = ref}>
        {grid}
    </div>)
};


const mapDispatchToProps = (dispatch: any) => ({
    storeGridElements: (menuElements: HTMLElement) => dispatch(storeContentElements(menuElements))
});

export default connect(null, mapDispatchToProps)(Grid);
