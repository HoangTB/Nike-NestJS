import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "./SliderSecondary.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { IProducts, Products } from "../../../../models/Product";
const SliderSecondary: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [cardData, setCardData] = React.useState<Array<IProducts>>([]);

  useEffect(() => {
    Products.getProduct()
      .then((data: IProducts[]) => {
        setCardData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-end mr-10 mb-3">
        <h2 className="h2">Top of Nike</h2>
        <div className="slider-buttons">
          <button
            onClick={() => {
              sliderRef.current?.slickPrev();
            }}
            className="btn btn-light"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={() => {
              sliderRef.current?.slickNext();
            }}
            className="btn btn-light"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {cardData &&
          cardData?.map((product) => {
            if (product.price! > 400) {
              return (
                <div
                  className="hover-opacity-70 duration-300 cursor-pointer position-relative p-2"
                  key={product.id}
                >
                  <img src={product.image} alt="..." className="img-fluid" />
                  <Link
                    className="fa-solid fa-circle-info detail-product"
                    to={`/detail/${product.id}`}
                  />
                  <div className="image-description mt-4 d-flex flex-column">
                    <div className="d-flex flex-column">
                      <span>{product.name}</span>
                      <span className="mr-10">{product.price} $</span>
                    </div>
                    <span className="opacity-50">{product.type}</span>
                  </div>
                </div>
              );
            }
          })}
      </Slider>
    </div>
  );
};

export default SliderSecondary;
