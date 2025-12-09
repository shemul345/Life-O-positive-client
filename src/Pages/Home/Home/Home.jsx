import React from 'react';
import Banner from '../Banner/Banner';
import HelpWay from '../HelpWay/HelpWay';
import SearchDonor from '../SearchDonor/SearchDonor';
import { useLoaderData } from 'react-router';
import DonorPortalFeatures from '../DonorPortalFeatures/DonorPortalFeatures';
import Mission from '../Mission/MIssion';


const Home = () => {
    const area = useLoaderData();
    return (
        <div>
            <Banner></Banner>
            <HelpWay></HelpWay>
            <SearchDonor area={area}></SearchDonor>
            <DonorPortalFeatures></DonorPortalFeatures>
            <Mission></Mission>
        </div>
    );
};

export default Home;