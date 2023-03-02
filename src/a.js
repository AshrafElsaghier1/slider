import React, { useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import "./App.css"
const imgs = [
    {
        id: 1,
        imgSrc: "assets/imgs/banner.webp",
    },
    {
        id: 2,
        imgSrc: "/assets/imgs/banner-2.webp",
    },
    {
        id: 3,
        imgSrc: "/assets/imgs/banner-3.webp",
    },
    {
        id: 4,
        imgSrc: "/assets/imgs/banner-4.webp",
    },
    {
        id: 5,
        imgSrc: "/assets/imgs/banner-5.webp",
    },
    {
        id: 6,
        imgSrc: "/assets/imgs/banner-6.webp",
    },
    {
        id: 7,
        imgSrc: "/assets/imgs/banner-7.webp",
    },
    {
        id: 8,
        imgSrc: "/assets/imgs/banner-8.webp",
    }, {
        id: 9,
        imgSrc: "/assets/imgs/banner-9.webp",
    }, {
        id: 10,
        imgSrc: "/assets/imgs/banner-10.webp",
    }, {
        id: 11,
        imgSrc: "/assets/imgs/banner-11.webp",
    }, {
        id: 12,
        imgSrc: "/assets/imgs/banner-12.webp",
    }, {
        id: 13,
        imgSrc: "/assets/imgs/banner-13.webp",
    }, {
        id: 14,
        imgSrc: "/assets/imgs/banner-14.webp",
    }, {
        id: 15,
        imgSrc: "/assets/imgs/banner-15.webp",
    }
];

const App = () => {
    let [active, setActive] = useState(1);
    const elementSidebarRef = useRef(null);
    const elementActiveImg = useRef(null);
    let [transformTranslate, setTransformTranslate] = useState({
        transformMainImg: 0,
        gap: 0,
        transformSidebarImg: 0,

    })
    const [sidebarTranslate, setSidebarTranslate] = useState({
        transform: 0,
        gap: 0
    })
    const { transformMainImg, gap, transformSidebarImg } = transformTranslate;

    const activeHandler = (id) => {
        setActive(id)
        if (id > 1) {
            setTransformTranslate({
                transform: parseInt(id - 1) * parseInt(elementActiveImg?.current?.offsetWidth),
                gap: id * 15
            })
        } else {
            setTransformTranslate({
                transform: 0,
                gap: 0
            })
        }
        if (id <= 4) {
            setSidebarTranslate({
                transform: 0,
            })
        }
        if (id >= 5 && id < imgs.length - 1) {
            setSidebarTranslate({
                transform: (parseInt((id - 4) * (elementSidebarRef?.current?.offsetHeight + 10))),
            })
        }
    }

    return (
        <div className='my-5' id='slider'>
            <Container>
                <Row className='align-items-center align-items-lg-start'>
                    <Col md={3} lg={2} className=' py-0 '>
                        <div className='overflow-hidden  '>

                            <div className='sidebar-container py-0 d-flex flex-column   ' style={{ transform: `translateY(-${sidebarTranslate.transform}px)` }} >
                                {imgs.map(({ imgSrc, id }) => (
                                    <div key={id} className={`imgs-sidebar-container ${active === id ? "active" : ""} `}
                                        ref={elementSidebarRef}
                                        onClick={() => activeHandler(id)} >
                                        <img src={imgSrc} alt={`img-${id}`} className="w-100" draggable={false} />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </Col>
                    <Col md={9} lg={10} className="mx-auto">

                        <div className='overflow-hidden ' >
                            <div className={`imgs-container d-flex h-100`} style={{ transform: `translateX(-${transform}px)`, gap: `${gap}` }} >
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