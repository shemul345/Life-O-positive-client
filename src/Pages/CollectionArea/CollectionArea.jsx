import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const CollectionArea = () => {
    const position = [23.6850, 90.3563];
    const collectionCenters = useLoaderData();
    const mapRef = useRef(null);
    console.log(collectionCenters)

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = collectionCenters.find(center => center.district.toLowerCase()
            .includes(location.toLowerCase()));
        if (district) {
            const coord = [district.latitude, district.longitude];
            // console.log(coord, district)
            mapRef.current.flyTo(coord, 14);
        }
    }
    return (
        <div className='my-10'>
            <h1 className='text-5xl text-center font-bold mb-5'>
                We are available in 64 districts</h1>
            {/* Search */}
            <div className='my-4'>
                <form onSubmit={handleSearch}>
                    <label className="input">

                        <input type="search"
                            required name='location'
                            placeholder="Search" />
                    </label>
                </form>
            </div>
            {/* Map */}
            <div className='border w-full h-[800px]'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[800px]'
                    ref={mapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        collectionCenters.map((center, index) => <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}>
                            <Popup>
                                <strong>{center.district}</strong>
                                <br />
                                {center.collection_area.join(',')}
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default CollectionArea;