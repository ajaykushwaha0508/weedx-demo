import React from 'react';

const NewProductinfoText = ({Product }) => {
    const [readopen , setreadopen] = React.useState(true)
    const handleContainerClick = (e) => {
        if (e.target.tagName === 'SPAN') {
            setreadopen(!readopen)
        }
    };
    return (
        <div className="w-100 mx-1 mt-4">
            <div className="newProductAboutUs_container py-4">
                <h2 className="newProductAboutUs_headings">{Product.heading} </h2> 
                <div className='newProductAboutUs_description' onClick={handleContainerClick}  dangerouslySetInnerHTML={readopen ? { __html: Product.text?.split('</p>')[0].split(" ").filter((items, index)=>{ return index < 50}).toString().replaceAll(',', ' ').replaceAll('  ', ', ') + ` <span id="band_shlebtn" className="band_shlebtn"> ...Read more</span>`   } : { __html: Product.text + `<span id="band_shlebtn" className="band_shlebtn">...Read less</span>` }}  />
              
                </div>
        </div> 
    )
}
export default NewProductinfoText 