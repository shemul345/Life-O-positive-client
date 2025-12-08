import React from 'react';
import helpWay from '../../../assets/helpWay.jpg'
import { MdBloodtype, MdOutlineInsertDriveFile, MdOutlineVolunteerActivism } from 'react-icons/md';
import { RiTeamLine } from 'react-icons/ri';

const HelpWay = () => {
    const items = [
        {
            title: 'Give blood',
            desc:
                "When you give blood with Vitalant, you save lives in your community and beyond.",
            icon: (
                <MdBloodtype className='text-white text-2xl' />
            ),
        },
        {
            title: 'Host a blood drive',
            desc:
                "Save even more lives by hosting a blood drive and inviting other people to donate blood.",
            icon: (
                <MdOutlineInsertDriveFile className='text-white text-2xl' />
            ),
        },
        {
            title: 'Volunteer',
            desc:
                "You can support hospital patients by providing assistance in various areas of Vitalant's mission.",
            icon: (
                <MdOutlineVolunteerActivism className='text-white text-2xl' />
            ),
        },
        {
            title: 'Join our team',
            desc:
                "Discover how rewarding it is to make an impact on people's lives by becoming part of the Vitalant team.",
            icon: (
                <RiTeamLine className='text-white text-2xl' />
            ),
        },
    ];
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className='text-4xl font-bold text-red-700 text-center mb-15'>Ways You Can Help</h1>
            <div className="relative bg-white overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                    {/* Left */}
                    <div className="relative flex justify-center lg:justify-end items-center">
                        
                        <div className="hidden lg:block absolute -left-24 w-[520px] h-[520px] rounded-full bg-purple-700" aria-hidden />


                        <div className="relative z-10 w-full max-w-sm lg:max-w-md">
                            <img
                                src={helpWay}
                                alt="Person preparing to donate blood"
                                className="w-full h-auto rounded-xl object-cover drop-shadow-lg"
                                style={{ transform: 'translateX(-6%)' }}
                            />
                        </div>
                    </div>


                    {/* Right */}
                    <div className="py-6 lg:py-0">
                        <div className="space-y-6 sm:space-y-8">
                            {items.map((it, idx) => (
                                <div key={idx} className="flex items-start gap-4 sm:gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="rounded-full p-3 sm:p-4 bg-orange-600 shadow-inner ring-4 ring-orange-200/40 flex items-center justify-center">
                                            <div className="text-white">{it.icon}</div>
                                        </div>
                                    </div>


                                    <div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-slate-800">{it.title}</h3>
                                        <p className="mt-1 text-sm sm:text-base text-slate-500">{it.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpWay;