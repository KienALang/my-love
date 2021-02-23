import "./PartialImage.css";

const PartialImage = ({ imageSize, imageSrc, style, imgStyle, onClick }) => {
  return (
    <div onClick={onClick} style={style} className="partial__image__container">
      <img
        className="partial__image__part"
        src={imageSrc}
        style={imgStyle}
        alt="Partial"
        width={imageSize}
      />
    </div>
  );
};

export default PartialImage;
