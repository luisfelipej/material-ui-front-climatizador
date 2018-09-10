import React from "react";
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
                <CardIcon title ={ `${props.prom}°C` }/>
                :
                <CardIcon title><CircularProgress color="inherit"/></CardIcon>
            }
        </CardHeader>
        <CardContent>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography color="inherit">Temperatura Máxima: {props.tmax}°C</Typography>
                    <Typography color="inherit">Temperatura Mínima: {props.tmin}°C</Typography>
                </Grid>
                <Grid item>
                    <Typography color="inherit">Grafico</Typography>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
)

export default TempProm;