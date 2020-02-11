import React, {Component} from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'wss://imr3-react.herokuapp.com';

class Chat extends Component {
    state = {
        name: 'Johann',
        messages: [],
    };

    ws = new WebSocket(URL);

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        };

        this.ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data);
            if (message[0] !== [] && message[0] !== undefined) {
                this.addMessage(message[0])
            }
        };

        this.ws.onclose = () => {
            console.log('disconnected');
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL),
            })
        }
    }

    addMessage = message => {
        this.setState(state => ({messages: [message, ...state.messages]}));
        console.log("add message :", message)
    };

    submitMessage = messageString => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = {name: this.state.name, message: messageString};
        this.ws.send(JSON.stringify(message))
    };

    render() {
        return (
            <div>
                <label htmlFor="name">
                    Name:&nbsp;
                    <input
                        type="text"
                        id={'name'}
                        placeholder={'Enter your name...'}
                        value={this.state.name}
                        onChange={e => this.setState({name: e.target.value})}
                    />
                </label>
                <ChatInput
                    ws={this.ws}
                    onSubmitMessage={messageString => this.submitMessage(messageString)}
                />
                {this.state.messages.map((message, index) =>
                    <ChatMessage
                        key={index}
                        message={message.message}
                        name={message.name}
                    />,
                )}
            </div>
        )
    }
}

export default Chat