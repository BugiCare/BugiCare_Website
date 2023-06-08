import React, {useEffect, useState} from 'react';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore,{ Pagination, Navigation,EffectFade } from 'swiper';
import "../css/customSwiper.scss"
import { GrFormPrevious,GrFormNext } from "react-icons/gr";
import styled from 'styled-components';
import {IconButton} from "@mui/material";
import { useRef } from 'react';
import Graph from "./Graph";
import axios from "axios";
import {url} from "../globals";
import {Card} from "./Card";

const CustomSwiper = ({id,children}) => {
    SwiperCore.use([Navigation, Pagination,EffectFade]);
    const swiperRef = useRef(null);
    const setting1 = {
        direction: 'horizontal',
        spaceBetween: -10,
        scrollbar: { draggable: true, el: null },
        slidesPerView: 3,
        pagination:{ clickable: true },
        mousewheel:true,
        loop:false,
    }
    const setting2 = {
        direction: 'horizontal',
        spaceBetween: 0,
        scrollbar: { draggable: true, el: null },
        slidesPerView: 1,
        pagination:{ clickable: true },
        mousewheel:true,
        loop:true,
    }
    const goToNextSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };
    const goToPrevSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const analyzedData =
        [1, 2, 3, 4, 5, 6]


    return (
        <>
            {id === "card"?
                <CardStyled>
                <IconButton onClick={goToPrevSlide} >
                <GrFormPrevious/>
                </IconButton>
                <ReactSwiper ref={swiperRef} {...setting1}>
                    {children}
                </ReactSwiper>
                <IconButton onClick={goToNextSlide}>
                <GrFormNext/>
                </IconButton>
                </CardStyled>
                :
        <GraphStyled>
            <IconButton onClick={goToPrevSlide} >
                <GrFormPrevious/>
            </IconButton>
            <ReactSwiper ref={swiperRef} {...setting2}>

                <SwiperSlide>
                    <Graph id={id} period={"day"}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Graph id={id} period={"week"}/>
                </SwiperSlide>
                <SwiperSlide>
                    <Graph id={id} period={"month"}/>
                </SwiperSlide>
            </ReactSwiper>
            <IconButton onClick={goToNextSlide}>
                <GrFormNext/>
            </IconButton>
        </GraphStyled>
            }
        </>
    );
};
const CardStyled = styled.div`
  height: 500px;
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    font-size: 3rem;
    padding: 0;
    background: none;
    border: none;
  }
 
}`;
const GraphStyled = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    font-size: 3rem;
    padding: 0;
    background: none;
    border: none;
  }
 
}`;

export default CustomSwiper;