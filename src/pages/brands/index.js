import React from 'react';
import Brand from '@/component/Brand/Brand';
import Layout from '@/layout/layout';
export default function Brands (props){ 
    return (
        <div>
            <Brand VerifyArrayData={props.verifyArrayData}></Brand>
        </div>
    );
};

Brands.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};


export async function getStaticProps() {
    let verifyArrayData = [];
    try {
        const response = await fetch('https://api.cannabaze.com/UserPanel/Get-AllBrand/');
        if (response.ok) {
            verifyArrayData = await response.json();
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return {
        props: {
            verifyArrayData,
        },
        revalidate: 10, // Optional: Revalidate the data every 10 seconds
    };
}



