import * as React from "react";
import {connect} from 'react-redux';


import * as actions from '../redux/navigation/actions'
import {useEffect} from "react";

const Navigation = (props: any) => {

    const handleKeyPress = (evt: KeyboardEvent) => {
        evt.preventDefault();
        evt.stopPropagation();
        switch(evt.key) {
            case 'ArrowUp': props.keyDown(props.currentFocus, evt);
                break;
            case 'ArrowDown': props.keyDown(props.currentFocus, evt);
                break;
            case 'ArrowLeft': props.keyDown(props.currentFocus, evt);
                break;
            case 'ArrowRight': props.keyDown(props.currentFocus, evt);
                break;
        }
    }

    useEffect(() => {
            window.addEventListener('keydown' , handleKeyPress);

            return () => {
            window.removeEventListener('keydown', handleKeyPress);
            }
    },[handleKeyPress])

    return (props.children)
};


const mapStateToProps = (state: any) => ({
    currentFocus: state,
})


const mapDispatchToProps = (dispatch: any) => ({
    keyDown: (currentFocus: any, evt: KeyboardEvent) => dispatch(actions.changeFocus(currentFocus, evt.key))
});


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
