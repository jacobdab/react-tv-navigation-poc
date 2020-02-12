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

    useEffect(() => {
        const currentFocus: HTMLElement | null = document.querySelector(`#${props.currentFocus.full}`);

        if(currentFocus) {
            let scroller: HTMLElement | null = document.querySelector(`.Grid`);
            const calculateTransition = currentFocus.clientHeight && props.currentFocus.number > 8
                ? (Math.floor((props.currentFocus.number / 4))) * (currentFocus.clientHeight + 20)
                : 0
            if(scroller && props.currentFocus.string === 'grid'){
                scroller.style.top = -calculateTransition + 'px';
            }
        }
    }, [props.currentFocus]);

    return (<div className={props.className} ref={ref => gridElements = ref}>
        {grid}
    </div>)
};

const mapStateToProps = (state: any) => ({
    currentFocus: state.focus.current.id
});

const mapDispatchToProps = (dispatch: any) => ({
    storeGridElements: (menuElements: HTMLElement) => dispatch(storeContentElements(menuElements))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
