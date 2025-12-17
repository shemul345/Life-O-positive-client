import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, Droplets, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const SearchPage = () => {
    // Location Data State
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    // Donor & Search State
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const donorsPerPage = 6;

    useEffect(() => {
        fetch('/data/districts.json')
            .then(res => res.json())
            .then(json => {
                const table = json.find(item => item.type === 'table' && item.name === 'districts');
                setDistricts(table?.data || []);
            });

        fetch('/data/upazilas.json')
            .then(res => res.json())
            .then(json => {
                const table = json.find(item => item.type === 'table' && item.name === 'upazilas');
                setUpazilas(table?.data || []);
            });
    }, []);

    const handleDistrictChange = (e) => {
        const districtName = e.target.value;
        const selectedDistrict = districts.find(d => d.name === districtName);
        if (selectedDistrict) {
            const upazilaList = upazilas.filter(u => String(u.district_id) === String(selectedDistrict.id));
            setFilteredUpazilas(upazilaList);
        } else {
            setFilteredUpazilas([]);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setCurrentPage(1);

        const form = e.target;
        const bloodGroup = form.bloodGroup.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        try {
            const res = await axios.get(`http://localhost:3000/donors-search?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${district}&upazila=${upazila}`);
            setDonors(res.data);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
            setSearched(true);
        }
    };

    // Pagination Logic
    const indexOfLastDonor = currentPage * donorsPerPage;
    const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
    const currentDonors = donors.slice(indexOfFirstDonor, indexOfLastDonor);
    const totalPages = Math.ceil(donors.length / donorsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Search form */}
                <div className="bg-white p-8 rounded-2xl shadow-sm mb-10 border border-red-100">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
                        <Droplets className="text-red-500" size={32} /> Search for Blood Donors
                    </h2>

                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <select name="bloodGroup" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500 bg-white" required>
                            <option value="">Blood Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>

                        <select name="district" onChange={handleDistrictChange} className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500 bg-white" required>
                            <option value="">Select District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.name}>{d.name}</option>
                            ))}
                        </select>

                        <select name="upazila" className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500 bg-white" required>
                            <option value="">Select Upazila</option>
                            {filteredUpazilas.map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                        </select>

                        <button type="submit" className="bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2 shadow-lg">
                            <SearchIcon size={20} /> Find Donors
                        </button>
                    </form>
                </div>

                {/* result section */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin inline-block w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
                        <p className="mt-4 text-red-500 font-medium">Searching for available donors...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentDonors.length > 0 ? (
                                currentDonors.map(donor => (
                                    <div key={donor._id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                        <div className="relative w-24 h-24 mx-auto mb-4">
                                            <img src={donor.avatar || donor.photoURL} className="w-full h-full rounded-full border-4 border-red-50 object-cover" alt={donor.name} />
                                            <div className="absolute bottom-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{donor.bloodGroup}</div>
                                        </div>
                                        <h3 className="text-xl font-bold text-center text-gray-800">{donor.name}</h3>

                                        <div className="mt-6 space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                                                <MapPin size={18} className="text-red-500" />
                                                <span>{donor.district}, {donor.upazila}</span>
                                            </div>
                                            <div className="flex justify-between items-center px-2">
                                                <span className="font-medium">Status:</span>
                                                <span className={`font-bold px-3 py-1 rounded-full text-xs ${donor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {donor.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : searched && (
                                <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                                    <Droplets size={60} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-gray-500 text-xl font-semibold">No active donors found in this area.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination Buttons */}
                        {donors.length > donorsPerPage && (
                            <div className="flex justify-center items-center mt-12 gap-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-full border bg-white hover:bg-red-50 disabled:opacity-30 transition"
                                >
                                    <ChevronLeft size={24} />
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`w-10 h-10 rounded-full font-bold transition ${currentPage === index + 1 ? 'bg-red-500 text-white shadow-lg' : 'bg-white text-gray-600 border hover:border-red-500'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-full border bg-white hover:bg-red-50 disabled:opacity-30 transition"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* initial state */}
                {!searched && !loading && (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-red-50">
                        <SearchIcon size={80} className="mx-auto text-red-100 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-400">Search results will appear here</h3>
                        <p className="text-gray-400 mt-2">Filter by blood group, district, and upazila to start</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;