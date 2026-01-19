import MainDeals from '@/component/MainDealsFolder/MainDeals';
import React from 'react';
import Createcontext from '@/hooks/context';
import Layout from '@/layout/layout';
import Currentlocation from '@/component/currentlocation/CurrentLocation';
export default function Deals(){
    const { state } = React.useContext(Createcontext)
    return (
        <div>
               {state.permission && <Currentlocation></Currentlocation>}
            <MainDeals></MainDeals>
        </div>
    );
};

Deals.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };