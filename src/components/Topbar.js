import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Menu from './Menu';

const logo = require('../images/nl-logo.png');

const styles = theme => ({
  appBar: {
    position: 'sticky',
    boxShadow: 'none',
    background: 'none',
    marginTop: '5em'
  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.down('md')]: {
      paddingTop: '1.5em',
      position: 'relative',
      marginRight: 32,
      position: '-webkit-sticky',
      position: 'sticky'
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '1.5em',
      position: 'relative'

    },
    position: 'absolute'
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      left:0
    }
  },
  iconButton: {
    float: 'right',
    color: 'white'
  },
  tabContainer: {
    marginTop:0,
    marginBottom:0,
    margin: 'auto',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    borderRadius: 3,
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 22,
    width: 20
  }
})

class Topbar extends Component {

  state = {
    value: 0,
    menuDrawer: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  current = () => {
    if(this.props.currentPath === '/home') {
      return 0
    }
    if(this.props.currentPath === '/ourstory') {
      return 1
    }
    if(this.props.currentPath === '/gallery') {
      return 2
    }
    if(this.props.currentPath === '/gigguide') {
      return 3
    }
    if(this.props.currentPath === '/booknow') {
      return 4
    }
    if(this.props.currentPath === '/parknride') {
      return 5
    }

  }

  render() {

    const { classes } = this.props;

    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
            <Grid container spacing={10} alignItems="baseline">
              <Grid item xs={12} className={classes.flex}>
                  
                  { !this.props.noTabs && (
                    <React.Fragment>
                      <div className={classes.productLogo}>
                        <img width={120} src={logo} alt="" />
                      </div>
                      <div className={classes.iconContainer}>
                        <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                          <MenuIcon />
                        </IconButton>
                      </div>
                      <div className={classes.tabContainer}>
                        <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
                          <AppBar title="Menu" />
                          <List>
                            {Menu.map((item, index) => (
                              <ListItem component={Link} to={{pathname: item.pathname, search: this.props.location.search}} button key={item.label}>
                                <ListItemText primary={item.label} />
                              </ListItem>
                            ))}
                          </List>
                        </SwipeableDrawer>
                        <Tabs
                          value={this.current() || this.state.value}
                          indicatorColor="inherit"
                          textColor="inherit"
                          onChange={this.handleChange}
                          centered
                        >
                          {Menu.map((item, index) => (
                            <Tab key={index} component={Link} to={{pathname: item.pathname, search: this.props.location.search}} classes={{root: classes.tabItem}} label={item.label} />
                          ))}
                          {
                          (this.current() === 5) &&
                            <Tab component={Link} to={"#"} classes={{root: classes.tabItem}} label={ "ParkNRide"} /> 
                          }
                        </Tabs>
                      </div>
                    </React.Fragment>
                  )}
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withRouter(withStyles(styles)(Topbar))
