import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
// import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import UserSelections from './UserSelections';
import './Sports.css'

class Events extends Component {
    state = {
        URL: 'https://api.the-odds-api.com/v3/odds/?mkt=h2h&region=uk&apiKey=e8b2f7a69758ce237da166bd177d0d33&sport=',
        currentKey: '',
        data: [],
        smoothData: [],
        events: null,
        selectedGame: []
    }

    updateState() {
        const currentKey = this.props.events;
        this.setState({
            currentKey
        })
        this.makeRequest(currentKey)
        }

    makeRequest = async (key) => {
        if (key.length) {
            const res = await Axios('http://localhost:3003/posts')
            const data = res.data[0].data;

            // Apelare API:
            // const res = await Axios(`${this.state.URL}${key}`)
            // const data = res.data.data;

            this.setState({
                data
            })
            this.renderEvents();
        }
    }

    componentDidMount() {
        this.updateState();
    }

    componentDidUpdate() {
        if (this.state.currentKey !== this.props.events){
            this.updateState();
        }
    }

    renderEvents() {
        this.transformData();
        const events = this.state.smoothData.map(el => (
                <tr key={ el.gamekey }>
                    <td>{ el.homeTeam } { '-' } {el.awayTeam}</td>
                    <td>{ el.startTime }</td>
                    <td>
                        <button value="1" onClick={ (e) => this.handleClick(el, e) } className="oddsButton">{ el.homeOdds }</button>
                    </td>
                    { el.drawOdds !== "-"?
                    <td>
                        <button value="X" onClick={ (e) => this.handleClick(el, e) } className="oddsButton">{ el.drawOdds }</button>
                    </td>:
                    <td>-</td>
                    }
                    <td>
                        <button value="2" onClick={ (e) => this.handleClick(el, e) } className="oddsButton">{ el.awayOdds }</button>
                    </td>
                </tr>
        ));

        this.setState({
            events
        })
    }

    transformData() {
        const smoothData = [];
        this.state.data.map((el) => {
            const homeTeam = el.home_team;
            const awayTeam = el.teams.filter(team => team !== homeTeam).toString();
            const gamekey = `${el.commence_time}_${homeTeam}_${awayTeam}`;
            const startTime = new Date(el.commence_time*1000).toLocaleString();
            const homeOdds = el.sites[0].odds.h2h[0];
            const awayOdds = el.sites[0].odds.h2h[1];
            let drawOdds = el.sites[0].odds.h2h[2];
            let gameOutcome = 'threeChoices';
            if (!drawOdds) {
                drawOdds = '-';
                gameOutcome = 'twoChoices';
            }
            return smoothData.push({gamekey, homeTeam, awayTeam, startTime, homeOdds, awayOdds, drawOdds, gameOutcome})
        })
        this.setState({
            smoothData
        })
    }

    handleClick(el, e) {
        let selectedGame = el;
        selectedGame.choice = e.currentTarget.value
        let choiceOdds;
        switch (selectedGame.choice) {
        case '1':
            choiceOdds = selectedGame.homeOdds;
            break;
        case 'X':
            choiceOdds = selectedGame.drawOdds;
            break;
        case '2':
            choiceOdds = selectedGame.awayOdds;
            break;
        default:
            choiceOdds = "1"
        }
        selectedGame.choiceOdds = choiceOdds;

        this.setState({
            selectedGame
        })
    }


    render() {
        // if(!this.state.events){
        //     return(
        //         <h1>Not yet loaded</h1>
        //     )
        // }
        return(
            <div>
                { this.state.smoothData[0]?
                <Table striped bordered>
                <thead className="listHead">
                    <tr>
                    <th>Game</th>
                    <th>Start date and time</th>
                    <th>1</th>
                    <th>X</th>
                    <th>2</th>
                    </tr>
                </thead>
                    <tbody>
                        { this.state.events }
                    </tbody>
                </Table>:
                <div id="competitionList">Please select competitions to view available events</div> }
                <UserSelections game={ this.state.selectedGame } />
            </div>
        )
    }
}

export default Events;