import PlaceOrder from '@/component/Checkout/PlaceOrder';
import React from 'react';
import Layout from "@/layout/layout";
import Createcontext from '@/hooks/context';
import Currentlocation from '@/component/currentlocation/CurrentLocation';

export default function Orderplaced  (props){
const {state} = React.useContext(Createcontext)
    return (
      <>
        {state.permission === false && <Currentlocation></Currentlocation>}
        <PlaceOrder orderid={props.params.id}></PlaceOrder>
      </>
    );
};

Orderplaced.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


export async function getServerSideProps(context) {
 

 return {
   props: {
     params: {
       id: context.query.id

     }
   }
 };
}