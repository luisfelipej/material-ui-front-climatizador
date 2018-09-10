import React from 'react';

import Card from './Card';
import CardHeader from './CardHeader';
import CardIcon from './CardIcon';
import { CardContent, Typography, Grid } from '@material-ui/core';
import { HorizontalBar } from 'react-chartjs-2';


const Consumos = props => (
    <Card>
        <CardContent>
            <Grid container>
                <HorizontalBar data={props.data} />
            </Grid>
        </CardContent>
    </Card>
)

export default Consumos;