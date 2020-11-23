import * as React from "react";
import {storeContentElements, storeLastFocusOfComponent, storeCurrentContentOffset} from "../../redux/navigation/actions";
import {connect} from "react-redux";

import './Grid.scss'
import {useEffect, useState} from "react";
import GridElement from "./gridElement/gridItem";

const Grid = (props: any) => {
    let gridElements: HTMLDivElement | null;
    let [getTransition, setTransition] = useState(0);
    let [getLastFocusId, setLastFocusId] = useState();
    const howManyElements = props.row * props.column;

    const onClickHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log(evt.currentTarget);
        // props.storeLastFocusOfComponent(evt.currentTarget)
    };



    const grid = [...Array(howManyElements)].map((_, index) => {
            return (<GridElement id={`grid${index}`} key={index} column={props.row} click={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => onClickHandler(evt)} {...props} >{index}</GridElement>)
        });



    useEffect(() => {
        gridElements && props.storeGridElements(gridElements);
    }, []);

    useEffect(() => {
        const currentFocus: HTMLElement | null = document.querySelector(`#${props.currentFocus.full}`);
        if(currentFocus) {
            let scroller: HTMLElement | null = document.querySelector(`.Grid`);
            if(scroller && props.currentFocus.string === 'grid') {
                getTransition = getTransition <= scroller.scrollHeight - scroller?.offsetHeight && props.currentFocus.number > 8
                || props.currentFocus.number < getLastFocusId
                    ? (Math.floor((props.currentFocus.number / 4))) * (currentFocus.clientHeight + 20)
                    : getTransition
                scroller.style.top = -getTransition + 'px';
                setTransition(getTransition);
                props.storeCurrentContentOffset(-getTransition);
                setLastFocusId(props.currentFocus.number)
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
    storeGridElements: (menuElements: HTMLElement) => dispatch(storeContentElements(menuElements)),
    storeLastFocusOfComponent: (currentTarget: EventTarget | null) => dispatch(storeLastFocusOfComponent(currentTarget)),
    storeCurrentContentOffset: (currentOffset: number) => dispatch(storeCurrentContentOffset(currentOffset))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
