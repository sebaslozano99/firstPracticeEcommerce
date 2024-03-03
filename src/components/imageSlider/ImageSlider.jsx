import PropTypes from "prop-types";
import styles from "./ImageSlider.module.css";
import { useState } from "react";


const ImageSlider = ({images}) => {

  const [index, setIndex] = useState(0);
  
  function nextPicture(){
    setIndex(index => index < images.length - 1 ? index + 1  : 0);
  }

  function prevPicture(){
    setIndex(index => index > 0 ? index - 1  : images.length - 1);
  }

  function onHoverChangeIndex(i){
    setIndex(i);
  }
  
  return (
    <div className={styles.mainDiv}>
        <div className={styles.floatingDiv}>
            {
              images?.map((element, i) => i < 4 ? 
                <div key={element} className={index !== i ? styles.imagesBoxes : `${styles.imagesBoxes} ${styles.selected}`} onMouseEnter={() => onHoverChangeIndex(i)} >
                  <img src={element} alt={element} className={styles.imagesInsideBoxes} />
                </div>
                :
                null
              )
            }
        </div>
        <div className={styles.mainSliderDiv}>
            <button className={styles.btn}  onClick={prevPicture}>&#8592;</button>
            <img src={images[index]} alt={images[index]} className={styles.img} />
            <button className={`${styles.btn} ${styles.right}`}  onClick={nextPicture}>&#8594;</button>
        </div>
    </div>
  )
}

export default ImageSlider



ImageSlider.propTypes = {
    images: PropTypes.array,
}
