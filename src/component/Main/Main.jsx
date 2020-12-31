import React from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Divider } from '@material-ui/core';

import useStyles from './style';

const Main = () => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Powered by Speechly" />
            <CardContent>
                <Typography  align="center" variant="h5">Total Balance $100</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    {/* Information */}
                    Transactions description Transactions description Transactions description
                </Typography>
                <Divider />
                {/* Form */}
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {/* list component */}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main
