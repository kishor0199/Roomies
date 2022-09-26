import { GoogleMap,GoogleApiWrapper,Marker,LoadScript } from '@react-google-maps/api';


const MapContainer = () => {
  
    const mapStyles = {        
      height: "100vh",
      width: "100%"};
    
    const defaultCenter = {
      lat: 41.3851, lng: 2.1734
    }
    
    return (
       <LoadScript
         googleMapsApiKey='AIzaSyBZfWLwah7PVx1cN1szDP9GA9OTXcMDB1s'>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          />
       </LoadScript>
    )
  }
  
  export default MapContainer;