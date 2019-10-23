import React from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import SessionContext from '../Login/SessionContext';
import Button from 'react-bootstrap/Button';
import './Sports.css';

class UserSelections extends React.Component {
    state = {
        selectedGames: [],
        listItems: null,
        prevProps: null,
        stake: 1
    };

    apiUrl = 'http://localhost:3003/lastSelection';

    handleInput = (e) => {
        let stake = e.currentTarget.value;
        if (stake > 100000) {
            stake = 100000;
        }
        this.setState({
            stake
        })
    }

    static contextType = SessionContext;

    renderChoices(selectedGames) {
        const events = selectedGames.map(el => (
            <tr key={ el.gamekey }>
                <td>{ el.homeTeam } { '-' } {el.awayTeam} <br/> { el.startTime }</td>
                <td>{ el.choice }</td>
                <td>{ el.choiceOdds }</td>
                <td><button onClick = { (e) => this.removeItem(el) }>X</button></td>
            </tr>
        ));
        return events;
    }

    removeItem = (currentLine) => {
        let selectedGames = this.state.selectedGames.filter(el => el.gamekey !== currentLine.gamekey);
        let listItems = selectedGames.length;
        this.setState({
            selectedGames,
            listItems
        })
    }

    async updateDB() {    
        if (this.context.user.id && this.state.selectedGames) {
            const clearDB = [];
            let res = await Axios(this.apiUrl + '?userID=' + this.context.user.id );
            res.data.forEach(game => {
                clearDB.push(Axios.delete(`${this.apiUrl}/${game.id}`));
            })
         res = await Promise.all(clearDB);
            const lastSelection = { userID: this.context.user.id, data: this.state.selectedGames }
            const selection = Axios.post(this.apiUrl, lastSelection);
            return selection;
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
            } 
        }
    }

    componentDidUpdate() {
        const selectedGames = this.state.selectedGames; 
        if (this.props !== this.state.prevProps && this.props.game.gamekey && !this.state.selectedGames.filter(el => el.gamekey === this.props.game.gamekey).length ) {
            selectedGames.push(this.props.game);
            const prevProps = this.props;
            const listItems = selectedGames.length;
            this.setState({
                selectedGames,
                listItems,
                prevProps
            }) 
        }
    }

    handleSave = () => this.updateDB();

    render(){
        return(
            <div className='virtualTicket'>
                <Table bordered>
                    <thead className="listHead">
                        <tr key='tableHead'>
                        <td id='event'>Event</td>
                        <td id='result'>Res</td>
                        <td id='odds'>Odds</td>
                        <td id='remove'></td>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.selectedGames.length?this.renderChoices(this.state.selectedGames):
                        <tr><td><p>Please select events</p></td></tr> }
                        <tr>
                            <td className="ticketFooter">
                                <label htmlFor="stake">Stake:</label><br/>
                                <input id="stake" type="number" value={ this.state.stake } min="1" max="100000" onChange={ this.handleInput } />
                                <select>
                                    <option value="ron">RON</option>
                                    <option value="euro">EUR</option>
                                    <option value="usd">USD</option>
                                </select>
                            </td>
                            <td colSpan="3" className="ticketFooter">Win:<br/>{ (this.state.selectedGames.reduce((prod, el) => prod*el.choiceOdds, 1)*this.state.stake).toFixed(2) }</td>
                        </tr>
                    </tbody>
                </Table>
                <Button size="lg" block onClick={ this.handleSave }>
                    Save
                </Button>
            </div>
        )
    }
}

export default UserSelections;