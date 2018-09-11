import React from 'react';

import Card from './Card';
import CardHeader from './CardHeader';
import CardIcon from './CardIcon';
import { CardContent, Typography, Grid, Chip, Avatar } from '@material-ui/core';
import { AcUnit, Whatshot } from '@material-ui/icons';

const Estados = props => (
    <Card>
        <CardContent>
            <Grid container justify="flex-start"><Typography style={{color: 'rgb(49,74,95)'}} variant="body1">Estado de los dispositivos</Typography></Grid>
            <Grid container alignContent="center" justify="center" spacing={16}>
                <Grid item>
                    {
                        (props.calefactor)
                        ?
                        <Chip
                        avatar={<Avatar><Whatshot/></Avatar>}
                        label="Calefactor"
                        variant="default"
                        color="secondary"
                        />
                        :
                        <Chip
                        avatar={<Avatar><Whatshot/></Avatar>}
                        label="Calefactor"
                        variant="outlined"
                        color="secondary"
                        />
                    }
                </Grid>
                <Grid item>
                    {
                        (props.ventilador)
                        ?
                        <Chip
                        avatar={<Avatar><AcUnit/></Avatar>}
                        label="Ventilador"
                        variant="default"
                        color="primary"
                        />
                        :
                        <Chip
                        avatar={<Avatar><AcUnit/></Avatar>}
                        label="Ventilador"
                        variant="outlined"
                        color="primary"
                        />
                    }
                </Grid>
            </Grid>
        </CardContent>
    </Card>
)

export default Estados;