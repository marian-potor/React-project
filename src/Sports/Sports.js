import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Competitions from './Competitions';
import './Sports.css'

class Sports extends React.Component {   
    state = {
        URL: 'https://api.the-odds-api.com/v3/sports/?apiKey=e8b2f7a69758ce237da166bd177d0d33&all=1',
        sports: [],
        sportsList: [],
        competitions: [],
        currentComp: []
      }; 
    
    sortSports(props) {
        let arr = props.map(el => el.group);
        return arr.reduce((newArr, el) => {
            if (!newArr.includes(el)){
                newArr.push(el);
            }
            return newArr;
        },[])
    }

    addCompetitions(allCompetitions, list) {
        let returnArr = [];
        for(const elem of list) {
            returnArr.push(allCompetitions.filter(el => el.group === elem));
        }
        return returnArr;
    }

    handleClick = (sport) => {
        const currentComp = [];
        this.state.competitions.forEach(comps => {
            comps.map(comp => comp.group === sport?currentComp.push(comp):'')
        });
        this.setState({
            currentComp
        });
    }

    async componentDidMount() {
        const res = await axios(this.state.URL);
        const sports = res.data.data;
        const sportsList = this.sortSports(sports);
        const competitions = this.addCompetitions(sports, sportsList);
        this.setState({
        sports,
        sportsList,
        competitions
        });
    }

    render () {
       return(
           <div className="container">
               <div className="sportsList">
                    <ListGroup>
                        { this.state.sportsList.length?<ListGroup.Item key="listHeader" className="listHead">Choose sport</ListGroup.Item>:'' }
                        { this.state.sportsList.map(el => <ListGroup.Item key={ el } action onClick={ this.handleClick.bind(this, el)}> { el } </ListGroup.Item>) }
                    </ListGroup>
               </div>
               <div className="competitions">
                    <Competitions competitions={ this.state.currentComp } />
               </div>
           </div>
       )
    }
}

export default Sports;