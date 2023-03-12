import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
import data from "./dummyData";
import "./App.css";

const Slider = ({ num, thumb }) => {
  const elementSidebarRef = useRef(null);
  const elementActiveImg = useRef(null);
  const [transformTranslate, setTransformTranslate] = useState({
    transformMainImg: 0,
    transformSidebarImgY: 0,
    transformSidebarImgX: 0,
    gapX: 0,
  });

  console.log({ thumb });

  const [currentImg, setCurrentImg] = useState(0);

  const [count, setCount] = useState(num);
  let [transformValueLastImgsY, setTransformValueLastImgsY] = useState(0);
  let [transformValueLastImgsX, setTransformValueLastImgsX] = useState(0);

  let halfShownCount = Math.round(count / 2);
  const { transformMainImg, transformSidebarImgY, transformSidebarImgX, gapX } =
    transformTranslate;
  const [layout, setLayout] = useState("vertical");

  let transformTranslateValue =
    layout === "vertical" ? transformSidebarImgY : transformSidebarImgX;
  useEffect(() => {
    setCount(num);
    const resizeHandler = () => {
      if (window.innerWidth > 767) {
        setLayout("vertical");
      } else {
        setLayout("horizontal");
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [num]);

  const sliderShowHandler = (currentImgIndex, index) => {
    if (currentImgIndex > index) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformMainImg: (currentImgIndex - 1) * 100,
          gapX: (currentImgIndex - 1) * 10,
        };
      });
    } else {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformMainImg: 0,
          gapX: 0,
        };
      });
    }

    if (currentImgIndex < halfShownCount) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformSidebarImgY: 0,
          transformSidebarImgX: 0,
        };
      });
    }

    if (
      currentImgIndex >= halfShownCount &&
      currentImgIndex <= data.length - halfShownCount
    ) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformSidebarImgY: (currentImgIndex - halfShownCount) * 80,
          transformSidebarImgX:
            (currentImgIndex - halfShownCount) *
            (elementSidebarRef?.current?.offsetWidth + 10),
        };
      });

      setTransformValueLastImgsY((data.length - count) * 80);
      setTransformValueLastImgsX(
        (data.length - count) * (elementSidebarRef?.current?.offsetWidth + 10)
      );
    }
    if (currentImgIndex > data.length - halfShownCount) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformSidebarImgY: transformValueLastImgsY,
          transformSidebarImgX: transformValueLastImgsX,
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
    if (index <= data.length - 1) {
      setCurrentImg(currentImg - 1);
    }
    sliderShowHandler(index, 0);
  };

  return (
    <div className="my-5" id="slider">
      <Container>
        <Row className={`align-items-center`}>
          <Col
            lg={`${layout === "vertical" ? 2 : 12} `}
            md={`${layout === "vertical" ? 3 : 12} `}
            className={` py-0  ${
              layout === "vertical" ? "order-1 " : "order-2  "
            }`}
          >
            <div
              className="overflow-hidden"
              style={{
                maxWidth: `calc( 176px * ${count})`,
                margin: " 20px auto",
              }}
            >
              <div
                className={`sidebar-container py-0 d-flex ${
                  layout === "vertical" ? "flex-column" : "flex-row "
                } `}
                style={{
                  transform: `  ${
                    layout === "vertical"
                      ? `translateY(-${transformTranslateValue}px)`
                      : `translateX(-${transformTranslateValue}px)`
                  } `,
                  height: `  ${
                    layout === "horizontal"
                      ? "auto"
                      : `calc( (80px * ${count})  )`
                  } `,
                  maxHeight: `  ${
                    layout === "horizontal"
                      ? "auto"
                      : `calc( (80px * ${count})  )`
                  } `,

                  gap: "10px",
                }}
              >
                {data.map(({ imgSrc, id }) => (
                  <div
                    ref={elementSidebarRef}
                    key={id}
                    className={`imgs-sidebar-container ${
                      currentImg + 1 === id ? "active" : ""
                    } 
                    ${layout === "vertical" ? "" : "firstEle-gap"} 
                    
                    
                    `}
                    onClick={() => activeClickHandler(id)}
                    style={{
                      height: `${
                        layout === "vertical"
                          ? `calc((100% / ${count}) - 10px)`
                          : "100px"
                      }`,
                      maxHeight: ` calc((100% / ${count}) - 10px)`,
                      minWidth: `${
                        layout === "horizontal"
                          ? `calc(100% / ${count} - 10px)`
                          : ` `
                      }`,
                    }}
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
                className="btn btn-sm "
                disabled={currentImg === 0 ? true : false}
                onClick={() => prevArrowHandler(currentImg)}
              >
                <ImArrowLeft />
              </button>
              <p className="mb-0"> {data[currentImg]?.title} </p>
              <button
                className="btn btn-sm"
                disabled={currentImg === data.length - 1 ? true : false}
                onClick={() => nextArrowHandler(currentImg + 1)}
              >
                <ImArrowRight />
              </button>
            </div>
          </Col>
          <Col
            lg={`${layout === "vertical" ? 10 : 12} `}
            md={`${layout === "vertical" ? 9 : 12} `}
            className={` mx-auto mb-5 mb-md-0   ${
              layout === "vertical" ? "order-2" : "order-1"
            }     `}
            style={{ maxWidth: "1000px" }}
          >
            <div className="overflow-hidden">
              <div
                className={`imgs-container d-flex h-100`}
                style={{
                  transform: `translateX( calc(-${transformMainImg}% - ${gapX}px))`,
                }}
              >
                {data.map(({ imgSrc, id }) => (
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
