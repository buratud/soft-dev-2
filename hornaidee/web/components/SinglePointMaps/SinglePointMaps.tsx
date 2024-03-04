import { useRef, useState, useEffect } from "react";
import * as atlas from 'azure-maps-control';
import "azure-maps-control/dist/atlas.min.css";

export default function SinglePointMaps() {
    const [map, setMap] = useState<atlas.Map>(null);
    const marketRef = useRef(null);
    const mapRef = useRef(null);
    const [location, setLocation] = useState([0, 0]);

    useEffect(() => {
            const map = new atlas.Map(mapRef.current, {
                center: [0, 0],
                zoom: 16,
                language: 'th-TH',
                authOptions: {
                    authType: atlas.AuthenticationType.subscriptionKey,
                    subscriptionKey: 'yTErSdqjV2gBKj_f2-qD8Wg7bAt6C2v0SHROqdtymoQ'
                },
                showLogo: false,
                showFeedbackLink: false,
                style: 'satellite',
            });
            map.controls.add(new atlas.control.StyleControl({
                mapStyles: ['road', 'grayscale_dark', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels'],
                layout: 'list'
            }), {
                position: atlas.ControlPosition.TopRight
            });
            map.controls.add(new atlas.control.ZoomControl(), {
                position: atlas.ControlPosition.BottomRight
            });
            map.controls.add(new atlas.control.CompassControl(), {
                position: atlas.ControlPosition.BottomRight
            });
            navigator.geolocation.getCurrentPosition(function (location) {
                const longLat = [location.coords.longitude, location.coords.latitude];
                map.setCamera({
                    center: longLat,
                    zoom: 16
                });
                setLocation(longLat);
            });
            map.events.add('click', function (e) {
                if (marketRef.current) {
                    marketRef.current.setOptions({ position: e.position });
                    setLocation([e.position[0], e.position[1]]);
                }
            });
            setMap(map);
    }, []);

    useEffect(() => {
        if (map) {
            console.log(location);
            const marker = new atlas.HtmlMarker({
                color: 'Red',
                position: location,
            });
            map.markers.add(marker);
            marketRef.current = marker;
        }
    }, [map]);

    return <div id="myMap" ref={mapRef} style={{ height: '500px', width: '100%', maxWidth: '1400px', padding: 0, margin: 0 }} />;
}