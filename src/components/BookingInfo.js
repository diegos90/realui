import React, {useContext} from 'react';
import { makeStyles  } from '@material-ui/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MUIPlacesAutocomplete, { geocodeByPlaceID } from 'mui-places-autocomplete';
import bookingContext from '../context/bookingContext';
import { yellow } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '90%',
      display: 'block'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '90%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textFieldTravelInfo: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '90%',
    },
    selectTravelInfo: {
      marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 200,
        display: 'inline'
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

  


function BookingInfo(props) {
  const classes = useStyles();
  //const inputLabel = React.useRef(null);
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    phoneNumber: '',
    departureDate: Date(),
    departureTime: Date(),
    depaturePickUpLocation: {},
    depatureDropOffLocation: {},
    returnDate: Date(),
    returnTime: Date(),
    returnPickUpLocation: {},
    returnDropOffLocation: {},
    vehicleType: '',
    trailerRequired: true
  });

  const bookingContextObj = useContext(bookingContext);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateInput = name => event => {
    setValues({ ...values, [name]: event });
  }

  const handleTimeInput = name => event => {
    setValues({ ...values, [name]: event });
  }

  const handleVehicleTypeSelect = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  const handleTrailerRequiredChecked = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const onSuggestionSelectedDeparture = suggestion => {
      console.log(suggestion)
      geocodeByPlaceID(suggestion.place_id).then((results) => {
  
        const { geometry } = results[0]
        console.log(geometry.location.lat(),)
        console.log(geometry.location.lng(),)
        
        values.depatureLocation.description = suggestion.description;
        values.depatureLocation.lat = geometry.location.lat();
        values.depatureLocation.lng = geometry.location.lng();

        bookingContextObj.depatureLocation.description = suggestion.description;
        bookingContextObj.depatureLocation.lat = geometry.location.lat();
        bookingContextObj.depatureLocation.lng = geometry.location.lng();

    }).catch((err) => {
        console.log("Ayo there be errors yo!")
        console.log(err)
      })


  }


  function createAutocompleteRequest(inputValue) {
    // Restrict the returned suggestions to those that:
    // 1) Are in Bellingham (latitude 48.7519, longitude 122.4787)
    // 2) Are within ~3 miles (5000 meters)
    // 3) Have an address associated with them
    return {
      input: inputValue,
      types: ['address'],
      location: { lat: () => 48.7519, lng: () => 122.4787 },
      radius: 5000,
    }
  }

 

  const onSuggestionSelectedReturn = suggestion => {
    console.log(suggestion)
    geocodeByPlaceID(suggestion.place_id).then((results) => {

      const { geometry } = results[0]
      console.log(geometry.location.lat(),)
      console.log(geometry.location.lng(),)
      
      values.returnLocation.description = suggestion.description;
      values.returnLocation.lat = geometry.location.lat();
      values.returnLocation.lng = geometry.location.lng();

      bookingContextObj.returnLocation.description = suggestion.description;
      bookingContextObj.returnLocation.lat = geometry.location.lat();
      bookingContextObj.returnLocation.lng = geometry.location.lng();

  }).catch((err) => {
      console.log("Ayo there be errors yo!")
      console.log(err)
    })
}

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container  alignContent='center'>
            <Grid item xs={12} md={6}>
            <header>Billing Information</header>
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                />
                <TextField
                    id="outlined-name"
                    label="Email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                />
                <TextField
                    id="outlined-name"
                    label="Cell Number"
                    className={classes.textField}
                    value={values.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    margin="normal"
                    variant="outlined"
                    fullWidth={true}
                    
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <header>Departure Choice</header>
                <KeyboardDatePicker
                    id="outlined-name"
                    label="Date"
                    className={classes.textFieldTravelInfo}
                    value={values.departureDate}
                    onChange={handleDateInput('departureDate')}
                    margin="normal"
                    variant="outlined"
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                />
                <KeyboardTimePicker
                    id="outlined-name"
                    label="Time"
                    className={classes.textFieldTravelInfo}
                    value={values.departureTime}
                    onChange={handleTimeInput('departureTime')}
                    margin="normal"
                    variant="outlined"
                    inputVariant="outlined"
                />
               
                <div style={{ position: 'relative'}}>
                    <MUIPlacesAutocomplete
                        id="outlined-name"
                        label="Pickup Location"
                        value={values.depaturePickUpLocation}
                        onChange={handleChange('depaturePickUpLocation')}
                        margin="normal"
                        variant="outlined"
                        onSuggestionSelected={onSuggestionSelectedDeparture}
                        textFieldProps={{ variant: 'outlined', label: 'Pickup Location', className: classes.textField, margin: 'normal', fullWidth: true}} 
                        renderTarget={() => (<div />)}
                    />
                </div>

                <div style={{ position: 'relative'}}>
                    <MUIPlacesAutocomplete
                        id="outlined-name"
                        label="Dropoff Location"
                        value={values.depatureDropOffLocation}
                        onChange={handleChange('depatureDropOffLocation')}
                        margin="normal"
                        variant="outlined"
                        onSuggestionSelected={onSuggestionSelectedDeparture}
                        textFieldProps={{ variant: 'outlined', label: 'Dropff Location', className: classes.textField, margin: 'normal', fullWidth: true}} 
                        renderTarget={() => (<div />)}
                    />
                </div>
                <header>Return Choice</header>
                <KeyboardDatePicker
                    id="outlined-name"
                    label="Date"
                    className={classes.textFieldTravelInfo}
                    value={values.returnDate}
                    onChange={handleDateInput('returnDate')}
                    margin="normal"
                    variant="outlined"
                    inputVariant="outlined"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                />
                
                <KeyboardTimePicker
                    id="outlined-name"
                    label="Time"
                    className={classes.textFieldTravelInfo}
                    value={values.departureTime}
                    onChange={handleTimeInput('departureTime')}
                    margin="normal"
                    variant="outlined"
                    inputVariant="outlined"
                />
                
                <div style={{ position: 'relative'}}>
                    <MUIPlacesAutocomplete
                        id="outlined-name"
                        label="Pickup Location"
                        value={values.depatureReturn}
                        onChange={handleChange('depatureReturn')}
                        margin="normal"
                        variant="outlined"
                        onSuggestionSelected={onSuggestionSelectedReturn}
                        textFieldProps={{ variant: 'outlined', label: 'Location', className: classes.textField, margin: 'normal', fullWidth: true}} 
                        renderTarget={() => (<div />)}
                    />
                </div>
                <div style={{ position: 'relative'}}>
                    <MUIPlacesAutocomplete
                        id="outlined-name"
                        label="Dropoff Location"
                        value={values.depatureReturn}
                        onChange={handleChange('depatureReturn')}
                        margin="normal"
                        variant="outlined"
                        onSuggestionSelected={onSuggestionSelectedReturn}
                        textFieldProps={{ variant: 'outlined', label: 'Location', className: classes.textField, margin: 'normal', fullWidth: true}} 
                        renderTarget={() => (<div />)}
                    />
                </div>
                <header>Vehicle Type</header>
                {/*<TextField
                    id="numberOfPeople"
                    label="Number of People"
                    className={classes.textField}
                    value={values.numberOfPeople}
                    onChange={handleChange('numberOfPeople')}
                    margin="normal"
                    variant="outlined"
                    type="number"
                    fullWidth={true}
                />*/}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel  htmlFor="outlined-name">
                    Vehicle Type
                  </InputLabel>
                  <Select
                    label="Time"
                    value={values.vehicleType}
                    onChange={handleVehicleTypeSelect}
                    input={<OutlinedInput name="vehicleType" id="outlined-name" />}
                    
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="NLPREMIUM">NL PREMIUM</MenuItem>
                    <MenuItem value="NLPREMIUMXL">NL PREMUIM XL</MenuItem>
                    <MenuItem value="NLSUPERSTAR">NL SUPERSTAR</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Checkbox checked={values.trailerRequired} onChange={handleTrailerRequiredChecked('trailerRequired')} value="trailerRequired" color="Primary"/>
                  }
                  label="Trailer required?"
                />
                </FormControl>
                
            </Grid>
        </Grid>
        </MuiPickersUtilsProvider>
  );
}

export default BookingInfo;
