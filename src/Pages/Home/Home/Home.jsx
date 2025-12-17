import React from 'react';
import Banner from '../Banner/Banner';
import HelpWay from '../HelpWay/HelpWay';
import DonorPortalFeatures from '../DonorPortalFeatures/DonorPortalFeatures';
import Mission from '../Mission/MIssion';
import SearchPage from '../SearchPage/SearchPage';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HelpWay></HelpWay>
            <SearchPage></SearchPage>
            <DonorPortalFeatures></DonorPortalFeatures>
            <Mission></Mission>
        </div>
    );
};

export default Home;