import React from "react";
import { CardContent, Typography, Grid} from "@material-ui/core";
import Card from './Card';
import CardHeader from './CardHeader';
import CardIcon from './CardIcon';

const TempProm = props => (
    <Card>
        <CardHeader title="hola"><CardIcon title ="20"/></CardHeader>
        <CardContent>
            <Grid container>
                <Typography color="inherit">Temperatura Promedio</Typography>
                <Typography color="inherit">Temperata Maxima</Typography>
                <Typography color="inherit">Temperata Minima</Typography>
            </Grid>
        </CardContent>
    </Card>
)

export default TempProm;