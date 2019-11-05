import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import OurStory from './pages/OurStory/OurStory'
import Gallery from './pages/Gallery/Gallery'
import GigGuide from './pages/GigGuide/GigGuide'
import Booking from './pages/Booking/Booking'
import ParkNRide from './pages/ParkNRide/ParkNRide'
import Main from './components/Main'
import ScrollToTop from './components/ScrollTop'
import SignUp from './components/Signup'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/ourstory' component={ OurStory } />
          <Route exact path='/gallery' component={ Gallery } />
          <Route exact path='/gigguide' component={ GigGuide } />
          <Route exact path='/booking' component={Booking} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/booknow' component={Booking} />
          <Route exact path='/parknride' component={ParkNRide} />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )