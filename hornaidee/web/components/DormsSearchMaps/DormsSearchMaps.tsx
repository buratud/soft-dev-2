'use client'
import {useRef, useState, useEffect, CSSProperties} from "react";
import * as atlas from 'azure-maps-control';
import "azure-maps-control/dist/atlas.min.css";
import './DormsSearchMaps.scoped.scss';
export default function DormsSearchMaps() {
    const [map, setMap] = useState<atlas.Map>(null);
    const marketRef = useRef<atlas.HtmlMarker>(null);
    const mapRef = useRef(null);
    const [location, setLocation] = useState([100, 13]);

    useEffect(() => {
        const map = new atlas.Map(mapRef.current, {
            center: location,
            zoom: 16,
            language: 'th-TH',
            authOptions: {
                authType: atlas.AuthenticationType.subscriptionKey,
                subscriptionKey: 'yTErSdqjV2gBKj_f2-qD8Wg7bAt6C2v0SHROqdtymoQ'
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
        const datasource = new atlas.source.DataSource();
    }, []);

    useEffect(() => {
        if (map) {
            const marker = new atlas.HtmlMarker({
                color: 'Red',
                position: location,
            });
            map.markers.add(marker);
            marketRef.current = marker;
        }
    }, [map]);

    useEffect(() => {
        if (marketRef.current) {
            marketRef.current.setOptions({ position: location });
        }
    }, [location]);

    return <div ref={mapRef} className="maps" />;
}