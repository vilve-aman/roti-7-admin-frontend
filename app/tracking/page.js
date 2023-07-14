"use client";

import React, { useState, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import BaseTemplate from '@/components/BaseTemplate'
import LoginRedirect from '@/components/LoginPage';


const TrackingPage = () => {

    return (


        <main className="h-full">
            <BaseTemplate
                pageTitle={"Track all the deliveries here"}
                activeIndex={4}
            >
                {/* <MapPageContent></MapPageContent> */}
            </BaseTemplate>
        </main>
    )
}

export default TrackingPage