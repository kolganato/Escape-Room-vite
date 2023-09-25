import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import { useRef, useEffect } from 'react';
import {
  COORDS_CENTER_CITY,
  URL_MARKER_CURRENT,
  URL_MARKER_DEFAULT,
  ZOOM_MAP,
} from '../../utils/common';
import { Location } from '../../types/location';
import { Booking } from '../../types/booking';

type MapProps = {
  location: Location;
  booking?: Booking[];
  selectedIdAddress?: Booking['id'] | undefined;
  onClickMarker?: (id: Booking['id']) => void;
  isOffice?: boolean;
};

const getMarkerIcon = (url: string) =>
  new Icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

function Map({
  location,
  booking,
  selectedIdAddress,
  onClickMarker,
  isOffice,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([COORDS_CENTER_CITY[0], COORDS_CENTER_CITY[1]], ZOOM_MAP);
    }
  }, [map, location]);

  useEffect(() => {
    if (map && booking && onClickMarker) {
      const markerLayer = layerGroup().addTo(map);
      booking.forEach((address) => {
        const marker = new Marker({
          lat: address.location.coords[0],
          lng: address.location.coords[1],
        });

        marker.addEventListener('click', () => {
          onClickMarker(address.id);
        });

        marker
          .setIcon(
            address.id === selectedIdAddress
              ? getMarkerIcon(URL_MARKER_CURRENT)
              : getMarkerIcon(URL_MARKER_DEFAULT)
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, booking, selectedIdAddress, onClickMarker]);

  useEffect(() => {
    if (map && isOffice) {
      const markerLayer = layerGroup().addTo(map);
      const marker = new Marker({
        lat: location.coords[0],
        lng: location.coords[1],
      });

      marker.setIcon(getMarkerIcon(URL_MARKER_DEFAULT)).addTo(markerLayer);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  },[location, isOffice, map]);

  return (
    <div
      className="map__container"
      ref={mapRef}
      style={{
        height: '100%',
        width: '100%',
        minHeight: '500px',
        maxWidth: '1140px',
        margin: '0 auto 50px',
      }}
    />
  );
}

export default Map;
