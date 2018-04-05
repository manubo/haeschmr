import React, { Component } from 'react';
import Blockchain from './models/Blockchain';
import Block from './models/Blockchain/Block';

export default initialState => socket => WrappedComponent => {
  return class Provider extends Component {
    constructor(props) {
      super(props);
      this.socket = socket;
      this.state = initialState;
    }

    componentDidMount() {
      this.socket.on('blockchain', blockchain =>
        this.setState({ blockchain: Blockchain.fromJSON(blockchain) })
      );
      this.socket.on('newBlock', jsonBlock => {
        console.log('newBlock', jsonBlock)
        const { blockchain } = this.state;
        const block = Block.fromJSON(jsonBlock);
        blockchain.add(block);
        this.setState({ blockchain });
      });
    }

    componentWillUnmount() {
      this.socket.close();
    }

    render() {
      console.log(this.state);
      return <WrappedComponent state={this.state} onEmit={this.emit} />;
    }

    emit = (msg, payload) => {
      this.socket.emit(msg, payload);
    };
  };
};
