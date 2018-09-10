import React from 'react';

import Card from './Card';
import CardHeader from './CardHeader';
import CardIcon from './CardIcon';
import { CardContent, Typography, Grid } from '@material-ui/core';


const Estados = props => (
    <Card>
        <CardContent>
            <Grid container alignContent="center">
                <Typography variant="body2" color="inherit">Estados</Typography>
            </Grid>
        </CardContent>
    </Card>
)

export default Estados;