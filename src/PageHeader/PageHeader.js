import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Jumbotron';
import './Styles.css';

function PageHeader () {
  return(
      <Jumbotron fluid className="banner">
        <Container>
          <h1>Fluid jumbotron</h1>
          <p>
            This is a modified jumbotron that occupies the entire horizontal space of
            its parent.
          </p>
        </Container>
      </Jumbotron>
  )
}

export default PageHeader; 