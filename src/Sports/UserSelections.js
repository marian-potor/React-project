import React from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import SessionContext from '../Login/SessionContext';
import { Container } from 'react-bootstrap';
import './Sports.css'

class UserSelections extends React.Component {
    state = {
        selectedGames: [],
        events: null,
        listItems: null,
        prevProps: null
    };

    apiUrl = 'http://localhost:3003/lastSelection';

    static contextType = SessionContext;

    renderChoices(selectedGames) {
        const events = selectedGames.map(el => (
            <tr key={ el.gamekey }>
                <td>{ el.homeTeam } { '-' } {el.awayTeam} { el.startTime }</td>
                <td>{ el.choice }</td>
                <td>{ el.choiceOdds }</td>
                <td><button onClick = { (e) => this.removeItem(el) }>Remove</button></td>
            </tr>
        ));

        this.setState({
            events
        });
    }

    removeItem = (currentLine) => {
        let selectedGames = this.state.selectedGames.filter(el => el.gamekey !== currentLine.gamekey);
        let listItems = selectedGames.length;
        this.setState({
            selectedGames,
            listItems
        })
        this.renderChoices(selectedGames);
    }

    async updateDB() {    
        if (this.context.user && this.state.selectedGames) {
            const clearDB = [];
            let res = await Axios(this.apiUrl + '?userID=' +this.context.user.id );
            res.data.forEach(game => {
                clearDB.push(Axios.delete(`${this.apiUrl}/${game.id}`));
            })
         res = await Promise.all(clearDB);
            const lastSelection = { userID: this.context.user.id, data: this.state.selectedGames }
            const selection = Axios.post(this.apiUrl, lastSelection);
        }
    }

    async componentDidMount() {
        if (this.context.user) {
            const res = await Axios(`${this.apiUrl}?userID=${this.context.user.id}`);
            const data = res.data.map(el => el.data);
            const selectedGames = data[0];
            if (selectedGames && selectedGames.length && selectedGames[0].gamekey) {
                this.setState({
                    selectedGames
                })
                this.renderChoices(selectedGames);
            } 
        }
    }

    componentDidUpdate() {
        const selectedGames = this.state.selectedGames; 
        if (this.props !== this.state.prevProps && this.props.game.gamekey && !this.state.selectedGames.filter(el => el.gamekey === this.props.game.gamekey).length ) {
            selectedGames.push(this.props.game);
            const prevProps = this.props;
            const listItems = selectedGames.length;
            console.log(listItems);
            this.setState({
                selectedGames,
                listItems,
                prevProps
            }) 
            this.renderChoices(selectedGames);
        }
    }

    handleSave = () => this.updateDB();

    render(){
        return(
            <div className='virtualTicket'>
                <Table bordered>
                    <thead className="listHead">
                        <tr key='tableHead'>
                        <th id='event'>Event</th>
                        <th id='result'>Result</th>
                        <th id='odds'>Odds</th>
                        <th id='remove'></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.events }
                        <tr>
                            <td>Stake:</td>
                            <td><input></input></td>
                            <td>Win:</td>
                            <td>{ this.state.selectedGames.reduce((prod, el) => prod*el.choiceOdds, 1) }</td>
                        </tr>
                    </tbody>
                </Table>
                <button onClick={ this.handleSave }>Save</button>
            </div>
        )
    }
}

export default UserSelections;