import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { CardContent, Typography, Grid, CircularProgress} from "@material-ui/core";
import Card from './Card';
import CardHeader from './CardHeader';
import CardIcon from './CardIcon';



const TempProm = props => (
    <Card>
        <CardHeader title="Temperatura promedio">
            {
                (Number(props.prom))
                ?
                <CardIcon info title ={ `${props.prom}°C` }/>
                :
                <CardIcon info title><CircularProgress color="inherit"/></CardIcon>
            }
        </CardHeader>
        <CardContent>
            <Grid container justify="space-between">
                <Grid item lg={8}>
                    <Typography color="inherit">Temperatura Máxima: {props.tmax}°C</Typography>
                    <Typography color="inherit">Temperatura Mínima: {props.tmin}°C</Typography>
                </Grid>
                <Grid item lg={4}>
                    {/* <Doughnut data={data} /> */}
                </Grid>
            </Grid>
        </CardContent>
    </Card>
)

export default TempProm;