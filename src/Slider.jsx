import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
import Form from "react-bootstrap/Form";
import "./App.css";
import imgs from "./dummyData";

const Slider = ({ num }) => {
  const elementSidebarRef = useRef(null);
  const elementActiveImg = useRef(null);
  const [transformTranslate, setTransformTranslate] = useState({
    transformMainImg: 0,
    transformSidebarImgY: 0,
    transformSidebarImgX: 0,
    gapX: 0,
  });
  const [currentImg, setCurrentImg] = useState(0);
  const [data] = useState(imgs);

  const [count, setCount] = useState(num);
  let [transformValueLastImgsY, setTransformValueLastImgsY] = useState(0);
  let [transformValueLastImgsX, setTransformValueLastImgsX] = useState(0);

  let halfShownCount = Math.round(count / 2);
  const { transformMainImg, transformSidebarImgY, transformSidebarImgX, gapX } =
    transformTranslate;
  const [layout, setLayout] = useState("horizontal");
  const labelHandler = (e) => {
    if (e.target.checked) {
      setLayout(e.target.id);
    }
  };
  let transformTranslateValue =
    layout === "vertical" ? transformSidebarImgY : transformSidebarImgX;
  useEffect(() => {
    setCount(num);

    const resizeHandler = () => {};
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [num]);

  const sliderShowHandler = (currentImgIndex, index) => {
    if (currentImgIndex > index) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformMainImg: parseInt(currentImgIndex - 1) * 100,
          gapX: parseInt(currentImgIndex - 1) * 10,
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
          transformSidebarImgY: parseInt(
            (currentImgIndex - halfShownCount) *
              (elementSidebarRef?.current?.offsetHeight + 10)
          ),
        };
      });

      setTransformValueLastImgsY(
        (data.length - count) * (elementSidebarRef?.current?.offsetHeight + 10)
      );
    }
    if (currentImgIndex > data.length - halfShownCount) {
      setTransformTranslate((prevState) => {
        return {
          ...prevState,
          transformSidebarImgY: transformValueLastImgsY,
        };
      });
    }

    // small media

    if (layout === "horizontal") {
      setTransformValueLastImgsX(
        (data.length - count) * (elementSidebarRef?.current?.offsetWidth + 10)
      );

      if (currentImgIndex <= Math.round(halfShownCount)) {
        console.log("test");
        setTransformTranslate((prevState) => {
          return {
            ...prevState,
            transformSidebarImgX: 0,
          };
        });
      }
      if (
        currentImgIndex > Math.round(halfShownCount) &&
        currentImgIndex < data.length
      ) {
        setTransformTranslate((prevState) => {
          return {
            ...prevState,
            transformSidebarImgX: parseInt(
              (currentImgIndex - halfShownCount) *
                (elementSidebarRef?.current?.offsetWidth + 10)
            ),
          };
        });
      }
      if (currentImgIndex > data.length - halfShownCount) {
        setTransformTranslate((prevState) => {
          return {
            ...prevState,
            transformSidebarImgX: transformValueLastImgsX,
          };
        });
      }
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

  console.log({ transformValueLastImgsX });
  console.log({ transformValueLastImgsY });

  return (
    <div className="my-5" id="slider">
      <Container>
        <Form>
          {["radio"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="horizontal"
                name="group1"
                type={type}
                id="horizontal"
                onChange={labelHandler}
                checked={layout === "horizontal" ? true : false}
              />
              <Form.Check
                inline
                label="vertical"
                name="group1"
                type={type}
                id="vertical"
                onChange={labelHandler}
                checked={layout === "vertical" ? true : false}
              />
            </div>
          ))}
        </Form>
        <Row className={`align-items-center `}>
          <Col
            xl={`${layout === "vertical" ? 2 : 12} `}
            className={` py-0  ${
              layout === "vertical" ? "order-1 " : "order-2 mt-5 "
            }`}
          >
            <div
              className="overflow-hidden"
              style={{
                maxWidth: "1000px",
                margin: "auto",
              }}
            >
              <div
                className={`sidebar-container py-0 d-flex ${
                  layout === "vertical" ? "flex-column" : "flex-row first"
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
                    ${layout === "vertical" ? "" : "first"} 
                    
                    
                    `}
                    onClick={() => activeClickHandler(id)}
                    style={{
                      height: ` calc((100% / ${count}) - 10px)`,
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
                className="btn btn-sm"
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
            className={` mx-auto mb-5 mb-md-0   ${
              layout === "vertical" ? "order-2" : "order-1"
            }     `}
            style={{ maxWidth: "1000px" }}
          >
            <div className="overflow-hidden ">
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
