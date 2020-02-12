import {listClasses} from '../constants/ListClasses'

export const recognizeProperClass = (lastClass: HTMLElement) => {
    if(lastClass.className === listClasses[0] || lastClass.className === listClasses[1]) {
        return lastClass.className
    }
    if(lastClass.parentElement?.className === listClasses[0] || lastClass.parentElement?.className === listClasses[1]) {
        return lastClass.parentElement?.className
    }
return lastClass.parentElement?.parentElement?.className;
};
