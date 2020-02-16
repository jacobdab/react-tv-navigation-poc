import * as React from "react";
import {storeContentElements, storeLastFocusOfComponent} from "../../redux/navigation/actions";
import {connect} from "react-redux";

import './Grid.scss'
import {useEffect} from "react";
import GridElement from "./gridElement/gridItem";

const Grid = (props: any) => {
    let gridElements: HTMLDivElement | null;
    const howManyElements = props.row * props.column;

    const onClickHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log('123');
        console.log(evt.currentTarget);
        props.storeLastFocusOfComponent(evt.currentTarget)
    };



    const grid = [...Array(howManyElements)].map((_, index) => {
            return (<GridElement id={`grid${index}`} key={index} column={props.row} click={(evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => onClickHandler(evt)} {...props} >{index}</GridElement>)
        });



    useEffect(() => {
        gridElements && props.storeGridElements(gridElements);
    }, []);

    useEffect(() => {
        const currentFocus: HTMLElement | null = document.querySelector(`#${props.currentFocus.full}`);
        let calculateTransition = 0;
        if(currentFocus) {
            let scroller: HTMLElement | null = document.querySelector(`.Grid`);
            if(scroller && props.currentFocus.string === 'grid') {
                console.log(scroller.clientHeight);
                console.log(scroller.offsetHeight);
                console.log(scroller.scrollHeight - scroller?.offsetHeight);
                calculateTransition = currentFocus.clientHeight && calculateTransition <= (scroller.scrollHeight - scroller?.offsetHeight) && props.currentFocus.number > 8
                    ? (Math.floor((props.currentFocus.number / 4))) * (currentFocus.clientHeight + 20)
                    : calculateTransition
                scroller.style.top = -calculateTransition + 'px';
            }
        console.log('transition' , calculateTransition);
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
    storeLastFocusOfComponent: (currentTarget: EventTarget | null) => dispatch(storeLastFocusOfComponent(currentTarget))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
