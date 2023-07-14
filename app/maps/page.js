"use client";

import React, { useState, useContext } from 'react';
import { AppContext } from '@/context/AppContext';

import MapPageContent from '@/components/MapPageContent';
import BaseTemplate from '@/components/BaseTemplate';
import LoginRedirect from '@/components/LoginPage';



export default function MapPageLayout({ children }) {

    return (


        <main className="h-full">
            <BaseTemplate
                pageTitle={"Generate Maps Here"}
                activeIndex={3}
            >
                <MapPageContent></MapPageContent>
            </BaseTemplate>
        </main>
    )
}