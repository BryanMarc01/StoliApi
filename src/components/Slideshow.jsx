import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';

const images = [
  'https://i.ytimg.com/vi/ZNIPGLaWzQE/maxresdefault.jpg',
  'https://cs2.gtaall.com/screenshots/4dc09/2016-06/original/f5c4b62a795e4354e79450e0e2c6b89167bcb791/338345-gta-sa-2016-06-03-19-50-06-11.jpg',
  'https://i.imgur.com/ulVcqCQ.jpg',
];

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} component="div">
            <img src={image} alt={`Slide ${index}`} style={{ width: '100%' }} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Slideshow;
