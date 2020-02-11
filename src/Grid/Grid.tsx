import * as React from "react";
import HorizontalList from '../HorizontalList/HorizontalList';
import {storeContentElements} from "../redux/navigation/actions";
import {connect} from "react-redux";

import './Grid.scss'
import {useEffect} from "react";

const Grid = (props: any) => {
    let gridElements: HTMLDivElement | null;
    // const calculateTotalElements =  * props.column;

    const grid = [...Array(props.row)].map((_, row) => {
            return (<HorizontalList row={row} column={props.column}></HorizontalList>)
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
