import {listClasses} from '../constants/ListClasses'

export const recognizeProperClass = (lastClass: HTMLElement) => {
    if(lastClass.className === listClasses[0] || lastClass.className === listClasses[1]) {
        return lastClass.className
    }

return lastClass.parentElement?.className;
};
