import React, { useState, useEffect } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';

/**
 * Renders a suggested route based on an array of coordinates
 * @category UI Component
 * @subcategory MapDisplay
 * @class MapDirectionsRenderer
 * @param {Array<locationData>} places an array of coordinates and datetime for contractor's location history
 * @return {ReactComponent}
 */
function MapDirectionsRenderer({ places = [] }) {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const travelMode = window.google.maps.TravelMode.DRIVING;
    const waypoints = places.map((location) => ({
      location: location,
      stopover: true,
    }));

    const origin = waypoints.shift().location;
    const destination = (waypoints.length > 0) ? waypoints.pop().location : origin;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints,
      },
      (result, status) => {
        if (status !== window.google.maps.DirectionsStatus.OK) {
          setError(JSON.stringify(result, null, 2));
        } else {
          setDirections(result);
        }
      }
    );
  }, [places]);

  if (error) {
    return (<h1>{error}</h1>);
  }

  return <DirectionsRenderer directions={directions} />;
}

export default MapDirectionsRenderer;
