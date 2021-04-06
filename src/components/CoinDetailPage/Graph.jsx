import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {Bar} from 'react-chartjs-2';

const Graph = () => {

    return (
        <div>
         <Bar 
            data ={{
                labels: ['Red','BLUE','PINK','green','sdsd']
            }}
            // height={400}
            // width='100vw'
            options={{maintainAspectRatio: true}}
         />
       
        </div>
    )
}

export default Graph
