'use client'
import {useRef, useState, useEffect, CSSProperties, useMemo, useReducer} from "react";
import * as atlas from 'azure-maps-control';
import "azure-maps-control/dist/atlas.min.css";
import styles from './DormsSearchMaps.module.scss';
import {Dorm, DormDiff} from "../../src/types";
import {NEXT_PUBLIC_AZURE_MAPS_KEY} from "../../config.js";

function diff(a: Dorm[], b: Dorm[]): DormDiff {
  const added = b.filter((dorm) => !a.some((d) => d.id === dorm.id));
  const removed = a.filter((dorm) => !b.some((d) => d.id === dorm.id));
  const updated = b.filter((dorm) => a.some((d) => d.id === dorm.id && d !== dorm));
  return {added, removed, updated};
}

export default function DormsSearchMaps({dorms: dormData = [], origin}: { dorms?: Dorm[], origin: number[] }) {
  const previousDorms = useRef<Dorm[]>([]);
  const [map, setMap] = useState<atlas.Map>(null);
  const markerRef = useRef<atlas.HtmlMarker>(null);
  const mapRef = useRef(null);
  const dataSource = useRef(new atlas.source.DataSource());

  useEffect(() => {
    const map = new atlas.Map(mapRef.current, {
      center: origin,
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
        const symbolLayer = new atlas.layer.SymbolLayer(dataSource.current, null, {
          iconOptions: {
            image: 'marker-red'
          }
        });
        map.sources.add(dataSource.current);
        map.layers.add(symbolLayer);
        const popup = new atlas.Popup({
          pixelOffset: [0, -18],
          closeButton: false
        });
        map.events.add('click', symbolLayer, (e) => {
          console.log(e);
        });
      },
    );
  }, []);

  useEffect(() => {
    if (map) {
      const marker = new atlas.HtmlMarker({
        position: origin,
        htmlContent: '<div style="background-color: blue; width: 20px; height: 20px; border-radius: 50%; border-color: white; border-width: 5px"></div>'
      });
      map.markers.add(marker);
      markerRef.current = marker;
    }
  }, [map]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setOptions({position: origin});
      map.setCamera({
        center: origin,
        zoom: 16,
      });
    }
  }, [origin]);

  useEffect(() => {
    const diffRes = diff(previousDorms.current, dormData);
    for (const dorm of diffRes.added) {
      const point = new atlas.data.Point([dorm.longitude, dorm.latitude]);
      // const shape = new atlas.Shape(point, dorm.id.toString());
      dataSource.current.add(new atlas.data.Feature(point, dorm, dorm.id.toString()));
    }
    for (const dorm of diffRes.removed) {
      console.log(dataSource.current.getShapes())
      dataSource.current.remove(dorm.id.toString());
    }
    previousDorms.current = dormData;
  }, [dormData]);

  return <div ref={mapRef} className={styles.maps}/>;
}