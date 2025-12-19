import React, { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { MdSearch, MdLocationOn, MdTravelExplore, MdPhone } from 'react-icons/md';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const CollectionArea = () => {
    const collectionCenters = useLoaderData(); 
    const mapRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");

    const position = [23.6850, 90.3563];
    const initialZoom = 7;

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchQuery.toLowerCase().trim();

        const matchedLocation = collectionCenters.find(center =>
            center.district.toLowerCase().includes(query) ||
            center.collection_area?.some(area => area.toLowerCase().includes(query))
        );

        if (matchedLocation && mapRef.current) {
            const coord = [matchedLocation.latitude, matchedLocation.longitude];
            mapRef.current.flyTo(coord, 13, {
                duration: 1.5,
                easeLinearity: 0.25
            });
        } else {
            alert("No collection center found for this location.");
        }
    };

    return (
        <div className='max-w-7xl mx-auto px-6 my-16 font-sans'>
            {/* Section Header */}
            <div className="text-center mb-12 space-y-3">
                <h1 className='text-4xl md:text-6xl font-black text-neutral-900 tracking-tight'>
                    Our <span className="text-red-600 underline decoration-red-200 underline-offset-8">Network</span>
                </h1>
                <p className="text-neutral-500 text-lg max-w-xl mx-auto">
                    Real-time blood collection points across 64 districts and all major Upazilas.
                </p>
            </div>

            {/* Search Interface */}
            <div className="flex justify-center mb-10">
                <form
                    onSubmit={handleSearch}
                    className="relative w-full max-w-2xl group"
                >
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <MdSearch className="text-neutral-400 text-2xl group-focus-within:text-red-600 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search district or upazila (e.g. Bogura, Mirpur...)"
                        className="w-full pl-14 pr-40 py-5 bg-white border-2 border-neutral-100 rounded-3xl shadow-xl focus:ring-4 focus:ring-red-500/10 focus:border-red-600 outline-none transition-all text-neutral-700"
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-3 bottom-3 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all flex items-center gap-2 active:scale-95"
                    >
                        <MdTravelExplore className="text-xl" />
                        <span className="hidden sm:inline uppercase tracking-widest text-xs">Find Center</span>
                    </button>
                </form>
            </div>

            {/* Map Container */}
            <div className='relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl h-[650px] lg:h-[800px] z-0'>
                <MapContainer
                    center={position}
                    zoom={initialZoom}
                    scrollWheelZoom={true}
                    className='h-full w-full'
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Dynamic Markers Mapping */}
                    {collectionCenters.map((center, index) => (
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}
                            icon={customIcon}
                        >
                            <Popup className="custom-popup">
                                <div className="p-2 min-w-[200px]">
                                    <div className="flex items-center gap-2 mb-3 border-b pb-2">
                                        <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                            <MdLocationOn size={20} />
                                        </div>
                                        <h3 className="font-bold text-lg text-neutral-800 leading-tight">
                                            {center.district}
                                        </h3>
                                    </div>

                                    <p className="text-[10px] font-black text-neutral-400 uppercase mb-2 tracking-widest">
                                        Available Upazilas/Areas:
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {center.collection_area?.map((area, i) => (
                                            <span
                                                key={i}
                                                className="text-[11px] bg-neutral-100 text-neutral-700 px-2 py-1 rounded-md border border-neutral-200"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>

                                    <button className="w-full py-3 bg-red-600 text-white text-[11px] font-bold rounded-xl hover:bg-neutral-900 transition-all flex items-center justify-center gap-2 uppercase tracking-tighter">
                                        <MdPhone /> Call Regional Lead
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Live Network Badge */}
                <div className="absolute top-6 right-6 z-[1000] bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-lg flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                    <span className="text-xs font-bold text-neutral-800 uppercase tracking-widest">Live Network</span>
                </div>
            </div>
        </div>
    );
};

export default CollectionArea;