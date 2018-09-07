import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const GraficoTemp = props => (
    <Card>
        <CardHeader></CardHeader>
        <CardContent>
            <Line data={props.data} />
        </CardContent>
    </Card>
)
    


export default GraficoTemp;