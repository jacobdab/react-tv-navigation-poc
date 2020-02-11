import * as React from 'react';

import './Content1.scss'
import '../gridElement/gridElement.scss'

import Grid from "../Grid/Grid";


const Content1 = (props: any) => {
    return (<Grid className={'Grid'} row={5} column={4} />)
};

export default Content1;
