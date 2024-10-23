import React from 'react'
import Image from 'next/image'
import gifimage from '../../../public/image/gif.svg';
import clases from '../../styles/customstyle.module.scss'
import { BsStarFill } from "react-icons/bs";
const Oops = (props) => {
  return (
    <>
      <div className={clases.oopss}>
        <div className={clases.errortext}>
          <Image unoptimized={true} width={100} height={100} src={gifimage.src} alt="no product" onError={(e) => (e.target.src = '/image/blankImage.jpg')} />
          <span>{`Menu Not Available`}</span>
          <p>{`This business hasn't posted its menu on Weedx.io yet. Click below to discover other nearby businesses`}</p>
          <span className={clases.back}>{`VIEW OTHER BUSINESSES`}</span>
        </div>
      </div>
      {
        props.AllReview.map((data, index) => {
          return (
            <div key={index} style={styles.card}>
              <div style={styles.header}>
                <div style={styles.profile}>
                  <Image
                    width={100}
                    height={100}
                    unoptimized
                    src={data.userImage} // Replace with the actual image source
                    alt="Profile"
                    style={styles.image}
                  />
                  <div>
                    <p style={styles.author}>{data.username}</p>
                  </div>
                  <div style={styles.rating}>
                    <span style={styles.star}>
                      {new Array(data.rating).fill(null).map((data, index) => (
                        <BsStarFill key={index} size={16} color="#31B665" />
                      ))}
                    </span>
                  </div>
                </div>
                <div style={styles.dateAndMenu}>
                  <span style={styles.date}>{data.created_at.slice(0,10)}</span>
                </div>
              </div>

              <div >
                <h4 style={styles.contenth4}>{data.Title}</h4>
                <p style={styles.content}>
                  {data.comment}
                </p>
              </div>
            </div>
          )
        })
      }
    </>
  )
}
export default Oops


const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    width: "100%",
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "12px",
  },
  title: {
    margin: "0",
  },
  author: {
    fontSize: '14px',
    margin: "0",
    color: "#666",
  },
  dateAndMenu: {
    display: "flex",
    alignItems: "center",
  },
  date: {
    marginRight: "8px",
    color: "#999",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    margin: "12px 5px",
  },
  ratingValue: {
    fontWeight: "bold",
    marginRight: "4px",
  },
  star: {
    color: "#4CAF50",
  },
  content: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '400px',
    color: "#a5a5a5"

  },
  contenth4: {
    fontSize: '14px',
    fontWeight: '500px',
    color: "#858585"
  }

};