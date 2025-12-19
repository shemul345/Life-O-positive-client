import React from 'react';
import Banner from '../Banner/Banner';
import HelpWay from '../HelpWay/HelpWay';
import DonorPortalFeatures from '../DonorPortalFeatures/DonorPortalFeatures';
import Mission from '../Mission/MIssion';
import SearchPage from '../SearchPage/SearchPage';
import FundingPage from '../../Funding/FundingPage';
import ImpactStats from '../ImpactStats/ImpactStats';
import Testimonials from '../Testimonials/Testimonials';
import FAQ from '../FAQ/FAQ';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ImpactStats></ImpactStats>
            <Mission></Mission>
            <HelpWay></HelpWay>
            <DonorPortalFeatures></DonorPortalFeatures>
            <Testimonials></Testimonials>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;