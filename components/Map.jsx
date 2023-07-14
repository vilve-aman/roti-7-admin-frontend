"use client"
import React, { useMemo } from 'react'


import { useLoadScript, GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import Image from 'next/image';
import { startTransition } from 'react';


const arrTolatlng = (coords) => {
    // console.log(coords)
    const arr = []
    coords.map((ele, i) => {
        arr.push({ lat: ele[1], lng: ele[0] })
    })
    return arr
}

const processArray = (arr) => {
    let pathCoordinates = []
    let waypoints = []
    arr.map((ele, i) => {
        pathCoordinates.push(arrTolatlng(ele.polyline))
        waypoints.push(arrTolatlng(ele.waypoints))
    })

    return { pathCoordinates, waypoints }
}

const Map = (props) => {

    // console.log('rendered', props)

    const routesArray = processArray(props.routesArray)
    // console.log(routesArray)

    // const pathCoordinates = []


    // const waypoints = arrTolatlng(props.waypoints)
    const start = { lat: props.start[1], lng: props.start[0] }



    const libraries = useMemo(() => ['places'], []);

    const mapOptions = useMemo(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
        }),
        []
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        libraries: libraries,
    });


    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div className='h-full w-full'>
            <GoogleMap
                options={mapOptions}
                zoom={13.3}
                center={start}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                onLoad={() => console.log('Map Component Loaded...')}
            >

                {/* start marker  */}
                <Marker
                    position={start}
                    onLoad={() => console.log('Marker Loaded')}
                    icon={'/kitchen-table.png'}
                    key={'uuid#kitchen'}
                >
                    <Image src={''} width={120} height={120} alt="base img" />
                </Marker>


                {/* polyline Array */}
                {
                    routesArray.pathCoordinates.map((route, idx) => {
                        // console.log(route)
                        return(
                            <Polyline
                            path={route}
                            onLoad={() => console.log('Polyline Component Loaded...')}
                            geodesic={true}
                            visible={true}
                            options={{
                                strokeColor: props.routesArray[idx].color,
                                strokeOpacity: 0.8,
                                strokeWeight: 4,
                                fillColor: props.routesArray[idx].color,
                                fillOpacity: 0.5,
                                visible: true,
                                radius: 30000,
                                zIndex: 1
                            }}
                            key={idx}
                        />
                        )
                    })
                }



                {/* marker array */}
                {
                    routesArray.waypoints.map((ele, idx) => {
                        // markerArray = []
                        return ele.map((e, i) => {
                            // console.log(e)
                            return (
                                <Marker
                                    position={e}
                                    onLoad={() => console.log('Marker Loaded')}
                                    icon={'/boxx.png'}
                                    key={`${idx}${i}`}
                                >
                                </Marker>
                            )
                        })
                    })
                }


            </GoogleMap>
        </div>
    );


}

export default Map