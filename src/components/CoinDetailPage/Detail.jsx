import React from 'react'
import { Typography, Grid, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


const Detail = ({ category, value, style }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            //   width: '100%',
            //   maxWidth: 360,
            backgroundColor: '#212f45',
            borderRadius: '10px'
        },
        divider: {
            background: '#0096C7',
            opacity: '0.6'
        },
        stat: {
            marginBottom: '20px'
        }
    }));
    const classes = useStyles();

    return (
        <div className={classes.stat}>
            <Grid item container xs={12} justify="space-between" >
                <Grid item >
                    <Typography variant="h6" style={{ fontSize: '14px' }} >
                        {category}
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography variant="h6" style={style} >
                        {value}
                    </Typography>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </div>
    )
}

export default Detail