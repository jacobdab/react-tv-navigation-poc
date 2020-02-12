import * as React from 'react';

import './Content1.scss'
import '../../Lists/Grid/gridElement/gridElement.scss'

import Grid from "../../Lists/Grid/Grid";


const Content1 = (props: any) => {
    return (<Grid className={'Grid'} row={20} column={4} />)
};

export default Content1;
