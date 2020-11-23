import {ACTIONS} from "./actionTypes";
import {updateObject} from "../../helpers/updateObject";
import * as helperList from '../../helpers/helpersList'

const initDefaultFocus = (state: any) => {
    const defaultFocus: HTMLElement | null = document.querySelector(`#${state.menu[0].id.full}`);
    defaultFocus?.classList.add('focus');

    return updateObject(state, {
        focus:
            {
                current:
                    {
                        component: state.menu[0].component,
                        list: state.menu[0].list,
                        id: {
                            full: state.menu[0].id.full,
                            string: state.menu[0].id.string,
                            number: state.menu[0].id.number
                        }
                    }
            }
    })
};

const navigateByKeyPress = (state: any) => {
    return state;
};

const storeMenuElements = (state: any, action: any) => {
    const formattedMenu = [...action.elements].map((element: any) => {
        const elemID = helperList.splitID(element.id);
        return {
            component: 'Menu',
            list: 'vertical',
            id: {full: element.id, string: elemID.id, number: elemID.number},
            className: element.className,
        }
    });

    return updateObject(state, {menu: formattedMenu})
};

const storeContentElements = (state: any, action: any) => {
    const formattedElements = [...action.elements].map((element: any) => {
        const elemID = helperList.splitID(element.id);
        return {
            component: 'grid',
            list: 'grid',
            id: {full: element.id, string: elemID.id, number: elemID.number},
            className: element.className,
        }
    });

    return updateObject(state, {grid: formattedElements})
};

const storeCurrentFocus = (state: any, action: any) => {
    const elemID = helperList.splitID(action.currentFocus.id);
    return updateObject(state, {
        focus:
            {
                current:
                    {
                        component: helperList.recognizeProperClass(action.currentFocus.parentElement),
                        list: state.menu[0].list,
                        id: {
                            full: action.currentFocus.id,
                            string: elemID.id,
                            number: elemID.number,
                        }
                    },
                Grid: state.focus?.Grid,
                Menu: state.focus?.Menu
            }
    })
};

const storeLastFocusOfComponent = (state: any, action: any) => {
    // console.log(action.lastFocusOfComponent.current.component);
    const component: string = action.lastFocusOfComponent.current.component;

    let updatedFocus = {
        focus: {
            current: state.focus.current,
            Menu: state.focus?.Menu,
            Grid: state.focus?.Grid,
            [component]: {
                list: action.lastFocusOfComponent.current.list,
                id: action.lastFocusOfComponent.current.id
            }
        }
    };


    return updateObject(state, updatedFocus)
};

const storeCurrentContentOffset = (state: any, action: any) => {
    return updateObject(state, {currentContentOffset: action.lastFocusOfComponent})
}


const navigation = (state: any, action: any) => {
    switch (action.type) {
        case ACTIONS.INIT_DEFAULT_FOCUS:
            return initDefaultFocus(state);
        case ACTIONS.NAVIGATE_BY_KEYPRESS:
            return navigateByKeyPress(state);
        case ACTIONS.STORE_MENU_ELEMENTS:
            return storeMenuElements(state, action);
        case ACTIONS.STORE_CONTENT_ELEMENTS:
            return storeContentElements(state, action);
        case ACTIONS.STORE_CURRENT_FOCUS:
            return storeCurrentFocus(state, action);
        case ACTIONS.STORE_LAST_FOCUS_OF_COMPONENT:
            return storeLastFocusOfComponent(state, action);
        case ACTIONS.STORE_CURRENT_CONTENT_OFFSET:
            return storeCurrentContentOffset(state, action);
    }
    return state;
};

export default navigation;
