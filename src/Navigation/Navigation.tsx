import {connect} from 'react-redux';


import * as actions from '../redux/navigation/actions'
import {useEffect} from "react";

const Navigation = (props: any) => {
    let scrollValue = 0;
    let scrollMenuValue = 0;

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

    const handleScroll = (evt: WheelEvent) => {
        evt.stopPropagation();
        console.log(evt);
        const scroll = evt.deltaY < 0 ? 'up' : 'down';
        // @ts-ignore
        const isMenu = evt.path.find((element) => element.className === 'Menu');
        if(scroll && isMenu){
            let scroller: HTMLElement | null = document.querySelector(`.nav`);
            if(scroller && scroll === 'down' && scrollMenuValue >= -scroller.scrollHeight + scroller?.clientHeight){
                scrollMenuValue += -83.07;
                scroller.style.top = scrollMenuValue + 'px';
            } else if (scroller && scroll === 'up' && scrollMenuValue < 0){
                scrollMenuValue += 83.07;
                scroller.style.top = scrollMenuValue + 'px';
            }
        } else if(scroll && !isMenu) {
            let scroller: HTMLElement | null = document.querySelector(`.Grid`);
            console.log(scroller);
            // @ts-ignore
            console.log(evt.path);
            console.log(scroller?.clientHeight);
            if(scroller && scroll === 'down' && scrollValue >= -scroller.scrollHeight + scroller?.clientHeight  ){
                console.log(-scroller.scrollHeight + scroller?.clientHeight);
                scrollValue += -220;
                scroller.style.top = scrollValue + 'px';
            } else if (scroller && scroll === 'up' && scrollValue < 0) {
                scrollValue += 220;
                // @ts-ignore
                scroller.style.top = scrollValue + 'px';
            }
        }
        console.log(scrollValue);
    }

    useEffect(() => {
            window.addEventListener('keydown' , handleKeyPress);
            window.addEventListener('wheel', handleScroll);
            return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('wheel', handleScroll);
            }
    },[handleKeyPress,handleScroll])

    return (props.children)
};


const mapStateToProps = (state: any) => ({
    currentFocus: state,
})


const mapDispatchToProps = (dispatch: any) => ({
    keyDown: (currentFocus: any, evt: KeyboardEvent) => dispatch(actions.changeFocus(currentFocus, evt.key))
});


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
