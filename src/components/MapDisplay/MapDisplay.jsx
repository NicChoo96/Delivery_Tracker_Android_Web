import React, { /* useState */ } from 'react';
import { GoogleMap, LoadScript, /* InfoWindow, withGoogleMap */ } from '@react-google-maps/api';
import MapDirectionRender from './MapDirectionRenderer';
import { googleMapsConfig } from '../../constants';
import './MapDisplay.scss'

/**
 * Renders a map of location history of the contractor
 * @category UI Component
 * @subcategory MapDisplay
 * @class MapDisplay
 * @param {Array<locationData>} places an array of coordinates and datetime for contractor's location history
 * @return {ReactComponent}
 */
const MapDisplay = ({ places }) => {
  const mapStyles = {
    height: '100%',
    width: '100%',
  };

  const defaultCenter = {
    lat: 1.3402,
    lng: 103.6755,
  };

  if (!(places && places.length && places.length > 0)) {
    return <p className="app__no-data-message">No Location Data Available</p>;
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsConfig.apiKey}>
      <div style={mapStyles}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={defaultCenter}
        >
          {/* {locations.map((item) => {
          return <Marker key={item.name} position={item.location} />;
        })} */}
          {/* {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <p>{selected.name}</p>
          </InfoWindow>
        )} */}
          <MapDirectionRender places={places} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapDisplay;
