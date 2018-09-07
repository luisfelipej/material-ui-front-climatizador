import React from 'react';
import { Line } from 'react-chartjs-2';
import { CardContent, Icon, Avatar } from '@material-ui/core';

import CardIcon from './CardIcon';
import CardHeader from './CardHeader';
import Card from './Card';

const GraficoTemp = props => (
    <Card style={{position: "relative"}}>
        <CardHeader>
            <CardIcon title={props.temp} />
        </CardHeader>
        <CardContent>
            <Line data={props.data} />
        </CardContent>
    </Card>
)
    


export default GraficoTemp;