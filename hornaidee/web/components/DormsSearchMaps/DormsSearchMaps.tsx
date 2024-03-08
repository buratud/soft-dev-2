'use client'
import {useRef, useState, useEffect, CSSProperties, useMemo, useReducer} from "react";
import * as atlas from 'azure-maps-control';
import "azure-maps-control/dist/atlas.min.css";
import './DormsSearchMaps.scoped.scss';
import {Dorm, DormDiff} from "../../src/types";
import CurrentLocation from './CurrentLocation';
import {NEXT_PUBLIC_AZURE_MAPS_KEY} from "../../config.js";
function diff(a: Dorm[], b: Dorm[]): DormDiff {
  const added = b.filter((dorm) => !a.some((d) => d.id === dorm.id));
  const removed = a.filter((dorm) => !b.some((d) => d.id === dorm.id));
  const updated = b.filter((dorm) => a.some((d) => d.id === dorm.id && d !== dorm));
  return {added, removed, updated};
}

export default function DormsSearchMaps({dorms: dormData = []}: { dorms?: Dorm[] }) {
  const previousDorms = useRef<Dorm[]>([]);
  const [map, setMap] = useState<atlas.Map>(null);
  const markerRef = useRef<atlas.HtmlMarker>(null);
  const mapRef = useRef(null);
  const [location, setLocation] = useState([100, 13]);
  const dataSource = new atlas.source.DataSource();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(loc => {
      setLocation([loc.coords.longitude, loc.coords.latitude]);
    }, () => {});
    const map = new atlas.Map(mapRef.current, {
      center: location,
      zoom: 16,
      language: 'th-TH',
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: NEXT_PUBLIC_AZURE_MAPS_KEY
      },
      showLogo: false,
      showFeedbackLink: false,
      style: 'satellite_road_labels',
    });
    map.controls.add(new atlas.control.StyleControl({
      mapStyles: ['road', 'grayscale_dark', 'grayscale_light', 'road_shaded_relief', 'high_contrast_dark', 'high_contrast_light', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels'],
      layout: 'list'
    }), {
      position: atlas.ControlPosition.TopRight
    });
    map.controls.add([new atlas.control.ZoomControl(), new atlas.control.CompassControl()], {
      position: atlas.ControlPosition.BottomRight
    });
    setMap(map);

    map.events.add('ready', () => {
      map.imageSprite.add('icon', 'https://cdn.discordapp.com/emojis/1149657537747091536.webp?size=128&quality=lossless').then(
        () => {
          const symbolLayer = new atlas.layer.SymbolLayer(dataSource, null, {
            iconOptions: {
              image: 'marker-red'
            }
          });
          map.sources.add(dataSource);
          map.layers.add(symbolLayer);
          map.events.add('click', symbolLayer, (e) => {
            console.log(e);
          });
          for (const dorm of dormData) {
            const point = new atlas.Shape(new atlas.data.Point([dorm.longitude, dorm.latitude]));
            dataSource.add([point]);
          }
        },
        (error) => {
          console.error(error);
        }
      )

    });
  }, []);

  useEffect(() => {
    if (map) {
      const marker = new atlas.HtmlMarker({
        position: location,
        htmlContent: '<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%; border-color: white; border-width: 5px"></div>'
      });
      map.markers.add(marker);
      markerRef.current = marker;
    }
  }, [map]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setOptions({position: location});
      map.setCamera({
        center: location,
        zoom: 16,
      });
    }
  }, [location]);

  useEffect(() => {
    if (map) {
      const diffRes = diff(previousDorms.current, dormData);
      for (const dorm of diffRes.added) {
        const point = new atlas.Shape(new atlas.data.Point([dorm.longitude, dorm.latitude]));
        dataSource.add([point]);
      }
      for (const dorm of diffRes.removed) {
        const point = dataSource.getShapes().find((shape) => shape.getType() === 'Point' && shape.getCoordinates()[0] === dorm.longitude && shape.getCoordinates()[1] === dorm.latitude);
        dataSource.remove([point]);
      }
      for (const dorm of diffRes.updated) {
        const point = dataSource.getShapes().find((shape) => shape.getType() === 'Point' && shape.getCoordinates()[0] === dorm.longitude && shape.getCoordinates()[1] === dorm.latitude);
        dataSource.remove([point]);
        const newPoint = new atlas.Shape(new atlas.data.Point([dorm.longitude, dorm.latitude]));
        dataSource.add([newPoint]);
      }
      previousDorms.current = dormData;
    }
  }, [dormData]);

  return <div ref={mapRef} className="maps"/>;
}