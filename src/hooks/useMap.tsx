import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import { COPYRIGHT, TILE_LAYER, ZOOM_MAP } from '../utils/common';
import { Location } from '../types/location';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: Location
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.coords[0],
          lng: location.coords[1],
        },
        zoom: ZOOM_MAP,
      });

      const layer = new TileLayer(
        TILE_LAYER,
        {
          attribution:
            COPYRIGHT,
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}

export default useMap;
