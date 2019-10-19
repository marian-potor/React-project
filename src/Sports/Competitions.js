import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Events from './Events';

class Competitions extends Component {
    state = {
        render: null,
        currentInfo: [],
        currentKey: ''
    }

    currentKey(elem) {
        // console.log(elem);
        
        const currentKey = elem.key;
        this.setState({
            currentKey
        })
        // console.log('key:', currentKey);
    }

    getComp() {
        const currentInfo = this.props.competitions;
        this.setState({
            currentInfo
        })
       
        if (currentInfo) {
            var groups = 
            <ListGroup>
                { currentInfo.length?<ListGroup.Item key="listHeader" className="listHead">Choose competition</ListGroup.Item>:'' }
                { currentInfo.map(el => <ListGroup.Item key={ el.key.concat(el.group) } action onClick={ this.currentKey.bind(this, el) }>{ el.details }{':'} { el.title }</ListGroup.Item>) }
            </ListGroup>
            this.setState({
                render: groups
            })
        // console.log(currentInfo);
        }
    }

    componentDidMount() {
        this.getComp();
    }

    componentDidUpdate() {
        if (this.state.currentInfo !== this.props.competitions){
            this.getComp()
            }
    }
    
    render() {
        return(
            <>
                { this.state.render }
                { <Events events={ this.state.currentKey }/> }
            </>
        )
    }
}

export default Competitions;