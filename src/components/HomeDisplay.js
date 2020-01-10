import React from 'react';
import Paper from '@material-ui/core/Paper';
import ReactPlayer from 'react-player'
import { makeStyles  } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    card: {
      backgroundColor: 'yellow'
    },
    paper: {
      padding: theme.spacing.unit * 3,
      paddingRight: 1,
      color: theme.palette.text.secondary,
      backgroundColor: 'rgba(0,0,0,0.5)',
      marginTop: 20
    },
    video: {
      height: 375,
      marginBottom: 10
    },
    image: {
      marginRight: '-60px'
    }
  }));

function HomeDisplay(props) {
  const classes = useStyles();
  const [homeContent, setHomeContent] = React.useState({
    homeContent: {}
  });
  axios.get('https://nite-life-d891a.firebaseio.com/home.json')
      .then((response) => {
        console.log(response.data)
        setHomeContent(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


  return (
    <Paper className={classes.paper}>
      <Grid container  spacing={3} alignItems="center">
            <Grid item md={8} xs={12}>
              <ReactPlayer className={classes.video} width='100%' url={homeContent.youtubeVideo1Url}   />
              <ReactPlayer className={classes.video} width='100%' url={homeContent.youtubeVideo2Url}  />
            
            </Grid>
            <Grid item md={2} xs={12}>
              <img className={classes.image} src={homeContent.image1Url} height={240} width={240}></img>
              <img className={classes.image} src={homeContent.image2Url} height={240} width={240}></img>
              <img className={classes.image} src={homeContent.image3Url} height={240} width={240}></img>
            </Grid>
      </Grid>
    </Paper>
  );
}

export default HomeDisplay;
