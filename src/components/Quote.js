import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));
  
  const price = df => {
     setTimeout(()=>{ "ddd"},5000)
  }

function Quote(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    email: ''
  });

  const pr = price();
  return (
        <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center" spacing={2}>
            <Grid item xs />
            <Grid item xs={6}>
                <Paper className={classes.root}>
                    <Typography component="p">
                    Your quote for park and Ride Service on DATE is:
                    </Typography>
                    <Typography variant="h5" component="h3">
                    R 560.00 {pr}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs />  
        </Grid>
  );
}

export default Quote;
