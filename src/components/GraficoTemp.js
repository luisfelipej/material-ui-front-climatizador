import React from 'react';
import { Line } from 'react-chartjs-2';
import { CardContent } from '@material-ui/core';

import CardIcon from './CardIcon';
import CardHeader from './CardHeader';
import Card from './Card';

const GraficoTemp = props => (
    <Card style={{position: "relative"}}>
        <CardHeader title="Temperatura vs Tiempo" variant="body1">
            {
                (props.temp)
                ?
                <CardIcon title={ `${props.temp}°C` } />
                :
                <CardIcon title="Conecte Arduino" error />
            }
        </CardHeader>
        <CardContent>
            <Line data={props.data} />
        </CardContent>
    </Card>
)
    


export default GraficoTemp;