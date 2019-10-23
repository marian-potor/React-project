import React from 'react';
import { Carousel } from 'react-bootstrap';
import './HomePage.css'

function HomePage () {
    return(
        <div id='homeBackground'>
        <Carousel className="carousel">
            <Carousel.Item>
                <img
                src="National_Arena.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h1 className="quotes">Make your own luck!</h1>
                <h3 className="quotes">You miss 100% of the shots you don't take.</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                src="tenis.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h1 className="quotes">Play now!</h1>
                <h3 className="quotes">You have to expect things of yourself before you can do them.</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                src="rugby.jpg"
                alt="First slide"
                />
                <Carousel.Caption>
                <h1 className="quotes">There are always more games</h1>
                <h3 className="quotes">It's not whether you get knocked down; it's whether you get up.</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    )
}

export default HomePage;