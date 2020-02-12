import {ACTIONS} from './actionTypes'

export const initDefaultFocus = () => {
    return {
        type: ACTIONS.INIT_DEFAULT_FOCUS,
    }
};

export const navigateByKeyPress = (key: string) => {
    return {
        type: ACTIONS.NAVIGATE_BY_KEYPRESS,
        keyPress: key
    }
};

export const storeMenuElements = (elements: HTMLElement) => {
    return {
        type: ACTIONS.STORE_MENU_ELEMENTS,
        elements: elements.children
    }
};

export const storeContentElements = (elements: HTMLElement) => {
    return {
        type: ACTIONS.STORE_CONTENT_ELEMENTS,
        elements: elements.children
    }
};

export const changeFocus = (state: any , keyPress: string) => {
    return (dispatch: any) => {
        let current: any;
        if (state && state.focus) {
            switch (keyPress) {
                case 'ArrowUp':
                    dispatch(storeLastFocusOfComponent(state.focus));
                    current = changeClass(state, 'ArrowUp');
                    current && dispatch(storeCurrentFocus(current));
                    break;
                case 'ArrowDown':
                    dispatch(storeLastFocusOfComponent(state.focus));
                    current = changeClass(state, 'ArrowDown');
                    current && dispatch(storeCurrentFocus(current));
                    break;
                case 'ArrowLeft':
                    dispatch(storeLastFocusOfComponent(state.focus));
                    if (state.focus.current.component === 'Menu') {break}
                    current = changeClass(state, 'ArrowLeft');
                    current && dispatch(storeCurrentFocus(current));
                    break;
                case 'ArrowRight':
                    dispatch(storeLastFocusOfComponent(state.focus));
                    current = changeClass(state, 'ArrowRight');
                    current && dispatch(storeCurrentFocus(current));
                    break;
            }
        }
    }
};

const changeClass = (state: any, direction: string) => {
        if (direction === 'ArrowDown') {
            let index = state.focus.current.id.number < state.menu.length ? state.focus.current.id.number : state.menu.length - 1;
            return findElement(state, index, 'down');
        }
        if (direction === 'ArrowUp') {
            let index = Number(state.focus.current.id.number) - 2 >= 0 ? Number(state.focus.current.id.number) - 2 : 0;
            return findElement(state, index, 'up');
        }
        if (direction === 'ArrowLeft') {
            let index = Number(state.focus.current.id.number) - 2 >= 0 ? Number(state.focus.current.id.number) - 2 : 0;
            return findElement(state, index, 'left');
        }
        if (direction === 'ArrowRight') {
            let index = Number(state.focus.current.id.number) - 2 >= 0 ? Number(state.focus.current.id.number) - 2 : 0;
            return findElement(state, index, 'right');
        }
};

const findElement = (state: any, index: number, direction?: any) => {
        let oldFocus: HTMLElement | null;
        let focus: HTMLElement | null;
        let element;
        if(state.menu[index]) {
            element = `${state.menu[0].id.string}${state.menu[index].id.number}`;
        }
        if(state.focus.current.component === 'Menu' && direction === 'right') {
            element =  state.grid[0].id.full;
            if(state.focus.Grid){
                element = state.focus.Grid.id.full
            }
        }

        if(state.focus.current.component !== 'Menu' && direction) {
            switch(direction){
                case 'up':
                    if (state.focus.current.id.number - 4 < 0) {return false};
                   element = state.grid[state.focus.current.id.number - 4].id.full
                    break;
                case 'down':
                    if (state.grid[state.grid.length - 1].id.number < state.focus.current.id.number + 4)  {return false};
                    element = state.grid[state.focus.current.id.number + 4].id.full
                    break;
                case 'left':
                    if(state.focus.current.id.number === 0) {
                        element = state.focus.Menu.id.full
                    break}
                    element = state.grid[state.focus.current.id.number - 1].id.full
                    break;
                case 'right':
                    if(state.focus.current.id.number === (state.grid.length -1)) {return false}
                    element = state.grid[state.focus.current.id.number + 1].id.full
                    break;
            }
        }
        oldFocus = document.querySelector(`#${state.focus.current.id.full}`);
        oldFocus?.classList.remove('focus');
        oldFocus?.classList.remove('focusHold');
        focus = document.querySelector(`#${element}`);
        focus?.classList.add('focus');
    if(oldFocus?.id.includes('menu') && focus?.id.includes('grid')){
        oldFocus?.classList.add('focusHold');
    }
        return state.focus.current.id.full !== focus?.id && focus
};

export const focusChanged = (focusedElement: any) => {
    return {
        type: ACTIONS.FOCUS_CHANGED,
        focusedElement: focusedElement
    }
};

export const storeCurrentFocus = (currentFocus: any) => {
    return {
        type: ACTIONS.STORE_CURRENT_FOCUS,
        currentFocus: currentFocus
    }
};

export const storeLastFocusOfComponent = (lastFocusOfComponent: any) => {
    return {
        type: ACTIONS.STORE_LAST_FOCUS_OF_COMPONENT,
        lastFocusOfComponent: lastFocusOfComponent
    }
};
