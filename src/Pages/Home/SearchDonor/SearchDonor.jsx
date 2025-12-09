import React from 'react';

const SearchDonor = ({ area }) => {
    console.log(area)
    return (
        <div className='my-15'>
            <h1 className='text-4xl font-bold
             text-red-700 text-center
             mb-10'>Search Donors</h1>
            <form>
                <fieldset className='flex items-center justify-center gap-5 flex-col lg:flex-row'>
                    <div className='flex flex-col w-52'>
                        <label className='text-black'>District</label>
                        <select defaultValue="Pick a district" className="select text-black appearance-none">
                            <option disabled={true} selected>Pick a district</option>
                            {area.map((district, index) => <option key={index}>{district.district}</option>)}
                        </select>
                    </div>
                    <div className='flex flex-col w-52'>
                        <label className='text-black'>Blood Group</label>
                        <select defaultValue="Select a blood group" className="select text-black appearance-none">
                            <option>Select</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            
                        </select>
                    </div>

                    <div className='flex flex-col w-52'>
                        <label className='text-black'>Date of Blood Donate</label>
                        <input type="date" className='input' />
                    </div>
                    <div className='flex flex-col w-52'>
                        <label className='text-black'>Donor Type</label>
                        <select defaultValue="Select a blood group" className="select text-black appearance-none">
                            <option value="All">All</option>
                            <option value="Eligible">Eligible</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='invisible'>Search</label>
                        <input type="submit" className='btn btn-active
                         btn-primary w-52 text-white
                          hover:bg-red-700' value="Search" />

                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default SearchDonor;