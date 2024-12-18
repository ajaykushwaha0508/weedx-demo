import React from 'react'
import Layout1 from '@/layout/layout1';
export default function mponline(){
  return (
    <div>{'mponline'}</div>
  )
}

mponline.getLayout = function getLayout(page) {
    return <Layout1>{page}</Layout1>;
};