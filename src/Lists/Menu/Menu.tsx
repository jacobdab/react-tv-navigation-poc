import * as React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";


import './Menu.scss'
import {useEffect} from "react";
import {Dispatch} from "redux";
import {storeMenuElements} from '../../redux/navigation/actions'


const Menu = (props: any) => {
    let ulList: any;
    useEffect(() => {
        if(ulList) {
            props.storeMenuElements(ulList);
        }
    }, []);

    useEffect(() => {
            const currentFocus: HTMLElement | null = document.querySelector(`#${props.currentFocus.full}`);

        if(currentFocus){
            let scroller: HTMLElement | null = document.querySelector(`.nav`);

            const calculateTransition = currentFocus.clientHeight && props.currentFocus.number > 10
                ? (props.currentFocus.number - 10) * currentFocus.clientHeight
                : 0
            if(scroller && props.currentFocus.string === 'menu'){
                scroller.style.top = -calculateTransition + 'px';
            }
        }
    }, [props.currentFocus]);

    return (<div className={props.className}>
        <h3>I'm okay</h3>
        <div className={'wrapper'}>
            <ul className={'nav'} ref={el => ulList = el}>
                <NavLink className={'nav-item'} to={'/'} exact activeClassName={'active'} id={`menu1`}>NAV 1</NavLink>
                <NavLink className={'nav-item'} to={'/content2'} activeClassName={'active'} id={`menu2`}>NAV 2</NavLink>
                <NavLink className={'nav-item'} to={'/content3'} activeClassName={'active'} id={`menu3`}>NAV 3</NavLink>
                <NavLink className={'nav-item'} to={'/content4'} activeClassName={'active'} id={`menu4`}>NAV 4</NavLink>
                <NavLink className={'nav-item'} to={'/content5'} activeClassName={'active'} id={`menu5`}>NAV 5</NavLink>
                <NavLink className={'nav-item'} to={'/content6'} activeClassName={'active'} id={`menu6`}>NAV 6</NavLink>
                <NavLink className={'nav-item'} to={'/content7'} activeClassName={'active'} id={`menu7`}>NAV 7</NavLink>
                <NavLink className={'nav-item'} to={'/content8'} activeClassName={'active'} id={`menu8`}>NAV 8</NavLink>
                <NavLink className={'nav-item'} to={'/content9'} activeClassName={'active'} id={`menu9`}>NAV 9</NavLink>
                <NavLink className={'nav-item'} to={'/content10'} activeClassName={'active'} id={`menu10`}>NAV 10</NavLink>
                <NavLink className={'nav-item'} to={'/content11'} activeClassName={'active'} id={`menu11`}>NAV 11</NavLink>
                <NavLink className={'nav-item'} to={'/content12'} activeClassName={'active'} id={`menu12`}>NAV 12</NavLink>
                <NavLink className={'nav-item'} to={'/content13'} activeClassName={'active'} id={`menu13`}>NAV 13</NavLink>
                <NavLink className={'nav-item'} to={'/content14'} activeClassName={'active'} id={`menu14`}>NAV 14</NavLink>
                <NavLink className={'nav-item'} to={'/content15'} activeClassName={'active'} id={`menu15`}>NAV 15</NavLink>
            </ul>
        </div>
    </div>)
}

const mapStateToProps = (state: any) => ({
    currentFocus: state.focus.current.id
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    storeMenuElements: (menuElements: HTMLElement) => dispatch(storeMenuElements(menuElements))
});

export default connect(mapStateToProps , mapDispatchToProps)(Menu);
