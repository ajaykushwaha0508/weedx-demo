import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
const Business = () => {
    const router = useRouter()

  return (
    <div className="tc_topic_list">
    <div className="heading_box"><h3 className='text-white m-0 sideTableHeading'>{`Table of Contents`}</h3></div>
        <ul>
          <Link href={{ hash:`#grow_your_business_with_weedx.io`,}} > <li className={router.pathname.includes( `#Grow_your_business_with_weedx.io`) && "activeTable"  }>{`1. Grow Your Business with WeedX.io`}
          </li></Link>
          <Link href={{ hash:`#why_list_your_business_on_weedx.io`,}} > <li className={router.pathname.includes(`#why_list_your_business_on_weedx.io`) && "activeTable"  }>{` 2.  Why List Your Business on WeedX.io?`}
          </li></Link>
          <Link href={{ hash:`#who_can_list_their_business?`,}} > <li className={router.pathname.includes( `#who_can_list_their_business?`) && "activeTable"  }> {` 3. Who Can List Their Business?`}
          </li></Link>
          <Link href={{ hash:`#how_to_add_your_business`,}} > <li className={router.pathname.includes(`#how_to_add_your_business`) && "activeTable"  }> {` 4. How to Add Your Business`}
          </li></Link>
          <Link href={{ hash:`#claim_your_existing_business_listing`,}} > <li className={router.pathname.includes(`#claim_your_existing_business_listing`) && "activeTable"  }> {` 4. Claim Your Existing Business Listing`}
          </li></Link>
          <Link href={{ hash:`#integration_with_cannabaze`,}} > <li className={router.pathname.includes( `#integration_with_cannabaze`) && "activeTable"  }> {`5. Integration with Cannabaze`}
          </li></Link>
        </ul>
    </div>
  )
}

export default Business