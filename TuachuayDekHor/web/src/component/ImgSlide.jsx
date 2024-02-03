import React,{useState} from 'react'
import "./ImgSlide.scoped.css"
import {Carousel,CarouselItem,CarouselIndicators,CarouselControl} from 'reactstrap'


const items = [
    {
      src: 'https://picsum.photos/id/123/1200/400',
      key: 1,
    },
    {
      src: 'https://picsum.photos/id/456/1200/400',
      key: 2,
    },
    {
      src: 'https://picsum.photos/id/678/1200/400',
      key: 3,
    },
  ];

function ImgSlide(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const Slides = items.map((item) =>{
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={item.src} alt={item.altText} />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            style={{marginTop: 70}}
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            {...args}>

        <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
        />
        {Slides}
        <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
        />
        <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
        />
    </Carousel>
    );
}
export default ImgSlide