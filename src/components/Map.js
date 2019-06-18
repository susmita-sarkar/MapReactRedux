import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLat: 0,
      currentLong: 0,
      destLat: 11,
      destLong: 10,
      directions: null
    };
    this.mapRef = React.createRef();
  }

  onSuccess = position => {
    console.log(position);
    this.setState(
      {
        currentLat: position.coords.latitude,
        currentLong: position.coords.longitude
      },
      () => this.getDirection()
    );
  };

  onError = () => {
    alert("this is not supported in your browser.please use another version");
  };

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    else alert("get lost");
  };

  getDirection = () => {
    const { google } = window;
    console.log(google);
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    console.log(directionsDisplay, directionsService);

    const map = this.mapRef;
    console.log(map);
    directionsDisplay.setMap(map);
    directionsService.route(
      {
        origin: new google.maps.LatLng(
          this.state.currentLat,
          this.state.currentLong
        ),
        destination: new google.maps.LatLng(23.85258, 87.65141),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        console.log("heyyyyffg");
        console.log(result, status);
        if (status === "OK") {
          console.log("heyyyyffg");
          console.log("heyyyy", result);
          this.setState({
            directions: result
          });
        }
      }
    );
  };

  render() {
    const MyMapComponent = withGoogleMap(props => (
      <GoogleMap
        ref={this.mapRef}
        defaultZoom={20}
        defaultCenter={{
          lat: this.state.currentLat,
          lng: this.state.currentLong
        }}
      >
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));
    return (
      <div>
        <MyMapComponent
          isMarkerShown
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
