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
            let index = state.focus.current.id.row < state.menu.length ? state.focus.current.id.row : state.menu.length - 1;
            return findElement(state, index, 'down');
        }
        if (direction === 'ArrowUp') {
            let index = Number(state.focus.current.id.row) - 2 >= 0 ? Number(state.focus.current.id.row) - 2 : 0;
            return findElement(state, index, 'up');
        }
        if (direction === 'ArrowLeft') {
            let index = Number(state.focus.current.id.row) - 2 >= 0 ? Number(state.focus.current.id.row) - 2 : 0;
            return findElement(state, index, 'left');
        }
        if (direction === 'ArrowRight') {
            let index = Number(state.focus.current.id.row) - 2 >= 0 ? Number(state.focus.current.id.row) - 2 : 0;
            return findElement(state, index, 'right');
        }
};

const findElement = (state: any, index: number, direction?: any) => {
        let oldFocus: HTMLElement | null;
        let focus: HTMLElement | null;
        let element = `${state.menu[0].id.string}${state.menu[index].id.number}`;

        if(state.focus.current.component === 'Menu' && direction === 'right') {
            element =  state.grid[0].id.full;
            if(state.focus.Grid){
                element = state.focus.Grid.id.full
            }
        }

        if(state.focus.current.component !== 'Menu' && direction) {
            console.log(direction);
            switch(direction){
                case 'up':
                    if (state.focus.current.id.row === 0) {return false};
                   element = state.focus.current.id.string + String(state.focus.current.id.row - 1) + String(state.focus.current.id.column);
                    break;
                case 'down':
                    if (state.focus.current.id.row === state.grid[state.grid.length -1].id.row) {return false};
                    element = state.focus.current.id.string + String(state.focus.current.id.row + 1) + String(state.focus.current.id.column);
                    break;
                case 'left':
                    if(state.focus.current.id.column === 0) {
                        console.log('1312');
                        element = state.focus.Menu.id.full
                    break}
                    element = state.focus.current.id.string + String(state.focus.current.id.row) + String(state.focus.current.id.column - 1);
                    break;
                case 'right':
                    if (state.focus.current.id.column === 3) {return false};
                    element = state.focus.current.id.string + String(state.focus.current.id.row) + String(state.focus.current.id.column + 1);
                    break;
            }
            // element = `${state.menu[0].id.full}`;
        }
        console.log(element);
        oldFocus = document.querySelector(`#${state.focus.current.id.full}`);
        oldFocus?.classList.remove('focus');
        focus = document.querySelector(`#${element}`);
        focus?.classList.add('focus');
        console.log(oldFocus);
        console.log(focus);
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
