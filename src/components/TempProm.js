import React from "react";
import { CardContent, Typography, Grid} from "@material-ui/core";
import Card from './Card';
import CardHeader from './CardHeader';
import CardIcon from './CardIcon';

const TempProm = props => (
    <Card>
        <CardHeader><CardIcon title ="20"/></CardHeader>
        <CardContent>
            <Grid>
                <Typography color="inherit">Temperatura Promedio</Typography>
                <Typography color="inherit">Temperata Maxima</Typography>
                <Typography color="inherit">Temperata Minima</Typography>
            </Grid>
        </CardContent>
    </Card>
)

export default TempProm;