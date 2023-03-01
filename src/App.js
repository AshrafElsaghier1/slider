import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { ImArrowRight, ImArrowLeft } from 'react-icons/im';
import "./App.css"
const imgs = [
  {
    id: 1,
    imgSrc: "assets/imgs/banner.webp",
    title: "Mercato"
  },
  {
    id: 2,
    imgSrc: "/assets/imgs/banner-2.webp", title: "Mercato"

  },
  {
    id: 3,
    imgSrc: "/assets/imgs/banner-3.webp", title: "Cut"

  },
  {
    id: 4,
    imgSrc: "/assets/imgs/banner-4.webp", title: "Eksel"

  },
  {
    id: 5,
    imgSrc: "/assets/imgs/banner-5.webp", title: "Taakkad"

  },
  {
    id: 6,
    imgSrc: "/assets/imgs/banner-6.webp", title: "Shiftat"

  },
  {
    id: 7,
    imgSrc: "/assets/imgs/banner-7.webp", title: "Salonat"

  },
  {
    id: 8,
    imgSrc: "/assets/imgs/banner-8.webp", title: "Kilinikat"

  }, {
    id: 9,
    imgSrc: "/assets/imgs/banner-9.webp", title: "Basket"

  }, {
    id: 10,
    imgSrc: "/assets/imgs/banner-10.webp", title: "A R2yk"

  }, {
    id: 11,
    imgSrc: "/assets/imgs/banner-11.webp", title: "Mednza"

  }, {
    id: 12,
    imgSrc: "/assets/imgs/banner-12.webp", title: "Zabon"

  }, {
    id: 13,
    imgSrc: "/assets/imgs/banner-13.webp", title: "Bahaar"

  }, {
    id: 14,
    imgSrc: "/assets/imgs/banner-14.webp", title: "Crepe & Waffle"

  }, {
    id: 15,
    imgSrc: "/assets/imgs/banner-15.webp", title: "Al Yusr"

  }
];

const App = () => {

  let [currentImg, setCurrentImg] = useState(1);

  const elementSidebarRef = useRef(null);
  const elementActiveImg = useRef(null);
  let [transformTranslate, setTransformTranslate] = useState({
    transformMainImg: 0,
    gap: 0,
    transformSidebarImg: 0,
  })
  const { transformMainImg, gap, transformSidebarImg } = transformTranslate;



  const activeHandler = (id) => {
    setCurrentImg(id)

    if (id > 1) {
      setTransformTranslate(prevState => {
        return {
          ...prevState,
          transformMainImg: parseInt(id - 1) * parseInt(elementActiveImg?.current?.offsetWidth),
          gap: 0,
        }
      })
    } else {
      setTransformTranslate(prevState => {
        return {
          ...prevState,
          transformMainImg: 0,
          gap: 0,
        }
      })
    }
    if (id <= 4) {
      setTransformTranslate(prevState => {
        return {
          ...prevState,
          transformSidebarImg: 0,
        }
      })
    }
    if (id >= 5 && id < imgs.length - 1) {
      setTransformTranslate(prevState => {
        return {
          ...prevState,
          transformSidebarImg: (parseInt((id - 4) * (elementSidebarRef?.current?.offsetHeight + 10))),
        }
      })
    }
  }


  const nextArrowHandler = (id) => {
    if (id >= 1) {
      setCurrentImg((prev) => prev + 1)
    }


    if (id >= 1) {
      setTransformTranslate(prevState => {
        return {
          ...prevState,
          transformMainImg: parseInt(id) * parseInt(elementActiveImg?.current?.offsetWidth),
          gap: 0,
        }
      })
    } else {
      setTransformTranslate(prevState => {
        return {
          ...prevState,
          transformMainImg: 0,
          gap: 0,
        }
      })
    }
    if (id <= 4) {
      setTransformTranslate(prevState => {
        return {
          ...prevState,
          transformSidebarImg: 0,
        }
      })
    }
    if (id >= 5 && id < imgs.length - 1) {
      setTransformTranslate(prevState => {
        return {
          ...prevState,
          transformSidebarImg: (parseInt((id - 4) * (elementSidebarRef?.current?.offsetHeight + 10))),
        }
      })
    }

  }
  // const prevArrowHandler = (id) => {
  //   if (id <= imgs.length - 1) {
  //     setCurrentImg(currentImg - 1)
  //   }
  //   if (id > 1) {
  //     setTransformTranslate(prevState => {
  //       return {
  //         ...prevState,
  //         transformMainImg: parseInt(id - 1) * parseInt(elementActiveImg?.current?.offsetWidth),
  //         gap: 0,
  //       }
  //     })
  //   } else {
  //     setTransformTranslate(prevState => {
  //       return {
  //         ...prevState,
  //         transformMainImg: 0,
  //         gap: 0,
  //       }
  //     })
  //   }
  //   if (id <= 4) {
  //     setTransformTranslate(prevState => {
  //       return {
  //         ...prevState,
  //         transformSidebarImg: 0,
  //       }
  //     })
  //   }
  //   if (id >= 5 && id < imgs.length - 1) {
  //     setTransformTranslate(prevState => {
  //       return {
  //         ...prevState,
  //         transformSidebarImg: (parseInt((id - 4) * (elementSidebarRef?.current?.offsetHeight + 10))),
  //       }
  //     })
  //   }
  // }




  return (
    <div className='my-5' id='slider'>
      <Container>
        <Row className='align-items-center align-items-lg-start'>
          <Col md={3} lg={2} className=' py-0 '>
            <div className='overflow-hidden  '>
              <div className='sidebar-container py-0 d-flex flex-column   ' style={{ transform: `translateY(-${transformSidebarImg}px)` }} >
                {imgs.map(({ imgSrc, id }) => (
                  <div key={id} className={`imgs-sidebar-container ${currentImg === id ? "active" : ""} `}
                    ref={elementSidebarRef}
                    onClick={() => activeHandler(id)} >
                    <img src={imgSrc} alt={`img-${id}`} className="w-100" draggable={false} />
                  </div>
                ))}
              </div>
            </div>
            <div className='btns-navigator d-flex align-items-center justify-content-center  '>
              <button className='btn btn-sm' disabled={currentImg === 1 ? true : false}  > <ImArrowLeft />  </button>
              <p className='mb-0'> {imgs[currentImg]?.title} </p>
              <button className='btn btn-sm' disabled={currentImg === imgs.length - 1 ? true : false} onClick={() => nextArrowHandler(currentImg)} > <ImArrowRight /></button>
            </div>
          </Col>
          <Col md={9} lg={10} className="mx-auto">
            <div className='overflow-hidden ' >
              <div className={`imgs-container d-flex h-100`} style={{ transform: `translateX(-${transformMainImg}px)`, gap: `${gap}` }} >
                {imgs.map(({ imgSrc, id }) => (
                  <img src={imgSrc} draggable={false} key={id} alt={`img-${id}`} className={` w-100  imgs-slider-container d-block`} ref={elementActiveImg}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div >
  )
}

export default App