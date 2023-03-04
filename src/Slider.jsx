import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
import "./App.css";
import imgs from "./dummyData";

const Slider = ({ num }) => {
  const elementSidebarRef = useRef(null);
  const elementActiveImg = useRef(null);
  const [transformTranslate, setTransformTranslate] = useState({
    transformMainImg: 0,
    gap: 0,
    transformSidebarImg: 0,
  });
  const [currentImg, setCurrentImg] = useState(0);
  const { transformMainImg, gap, transformSidebarImg } = transformTranslate;
  const [count, setCount] = useState(num);
  let [transformValueLastImgs, setTransformValueLastImgs] = useState(0);

  useEffect(() => {
    setCount(num);
  }, [num]);
  let halfCount = Math.round(count / 2);

  const sliderShowHandler = (currentImgIndex, index) => {
    if (currentImgIndex > index) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformMainImg:
            parseInt(currentImgIndex - 1) *
            parseInt(elementActiveImg?.current?.offsetWidth),
          gap: 0,
        };
      });
    } else {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformMainImg: 0,
          gap: 0,
        };
      });
    }

    if (currentImgIndex < halfCount) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformSidebarImg: 0,
        };
      });
    }

    if (
      currentImgIndex >= halfCount &&
      currentImgIndex <= imgs.length - halfCount
    ) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformSidebarImg: parseInt(
            (currentImgIndex - halfCount) *
              (elementSidebarRef?.current?.offsetHeight + 10)
          ),
        };
      });

      setTransformValueLastImgs(
        (imgs.length - count) * (elementSidebarRef?.current?.offsetHeight + 10)
      );
    }

    if (currentImgIndex > imgs.length - halfCount) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformSidebarImg: transformValueLastImgs,
        };
      });
    }
  };

  const activeClickHandler = (index) => {
    setCurrentImg(index - 1);
    sliderShowHandler(index, 1);
  };

  const nextArrowHandler = (index) => {
    if (index >= 0) {
      setCurrentImg((prev) => prev + 1);
    }
    sliderShowHandler(index + 1, 0);
  };
  const prevArrowHandler = (index) => {
    if (index <= imgs.length - 1) {
      setCurrentImg(currentImg - 1);
    }
    sliderShowHandler(index, 0);
  };

  return (
    <div className="my-5" id="slider">
      <Container>
        <Row className="align-items-center ">
          <Col md={3} lg={2} className=" py-0 order-2 order-md-1  ">
            <div className="overflow-hidden  ">
              <div
                className="sidebar-container py-0 d-flex flex-row flex-md-column"
                style={{
                  transform: `translateY(-${transformSidebarImg}px)`,
                  height: `calc( (80px * ${count})  )`,
                  maxHeight: `calc( (80px * ${count})  )`,
                  gap: "10px",
                }}
              >
                {imgs.map(({ imgSrc, id }) => (
                  <div
                    key={id}
                    className={`imgs-sidebar-container ${
                      currentImg + 1 === id ? "active" : ""
                    } `}
                    ref={elementSidebarRef}
                    onClick={() => activeClickHandler(id)}
                    style={{ height: ` calc((100% / ${count}) - 10px)` }}
                  >
                    <img
                      src={imgSrc}
                      alt={`img-${id}`}
                      className="w-100"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="btns-navigator d-flex align-items-center justify-content-center  ">
              <button
                className="btn btn-sm"
                disabled={currentImg === 0 ? true : false}
                onClick={() => prevArrowHandler(currentImg)}
              >
                <ImArrowLeft />
              </button>
              <p className="mb-0"> {imgs[currentImg]?.title} </p>
              <button
                className="btn btn-sm"
                disabled={currentImg === imgs.length - 1 ? true : false}
                onClick={() => nextArrowHandler(currentImg + 1)}
              >
                <ImArrowRight />
              </button>
            </div>
          </Col>
          <Col md={9} lg={10} className="mx-auto  order-1 order-md-2 mb-5">
            <div className="overflow-hidden ">
              <div
                className={`imgs-container d-flex h-100`}
                style={{
                  transform: `translateX(-${transformMainImg}px)`,
                  gap: `${gap}`,
                }}
              >
                {imgs.map(({ imgSrc, id }) => (
                  <img
                    src={imgSrc}
                    draggable={false}
                    key={id}
                    alt={`img-${id}`}
                    className={` w-100  imgs-slider-container d-block`}
                    ref={elementActiveImg}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Slider);
