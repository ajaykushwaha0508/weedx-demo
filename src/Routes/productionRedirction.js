import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CurrentLocation from '../Components/Component/Navbar/Component/CurrentLocation';
import  Createcontext  from '../Hooks/Context'; // Assuming Createcontext is a named export
// Adjust the import above based on the actual export name in your context file

export default function ProductRedirction(props) {
    const location = useLocation();
    const Navigate = useNavigate();
    const { pathname } = location;
    const { Component } = props;
    const { state } = useContext(Createcontext); // Corrected useContext usage

    useEffect(() => {
        const index = pathname.indexOf('/menu') + '/menu'.length;
        const extracted = pathname.substring(index);
        Navigate(`/products${extracted}`);
    }, [pathname, Navigate]); // Include dependencies pathname and Navigate

    return (
        <div>
            <Component />
            {!state.permission && <CurrentLocation />}
        </div>
    );
}
