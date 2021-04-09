import React from 'react'
import { Typography, Grid, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Detail = ({ category, value, style }) => {
    const smallLaptop = useMediaQuery("(max-width: 1290px)");

    const useStyles = makeStyles((theme) => ({
        divider: {
            background: '#0096C7',
            opacity: '0.6'
        },
        statLarge: {
            marginBottom: '20px'
        },
        statSmall: {
            marginBottom: '10px'
        }
    }));
    const classes = useStyles();

    return (
        <>
            {smallLaptop ?
                (
                    <div className={classes.statSmall}>
                        <Grid item container justify="space-between" >
                            <Grid item >
                                <Typography variant="h6" style={{ fontSize: '14px' }} >
                                    {category}
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography variant="body1" style={style} >
                                    {value}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider} />
                    </div>
                ) :
                (
                    <div className={classes.statLarge}>
                        <Grid item container justify="space-between" >
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
        </>
    )
}

export default Detail