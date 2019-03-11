import React, { Component } from 'react';

const ContextApi = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flash: false,
      flashMessage: 'Provider you, consumer me...'
    };
  }

  showFlashMessage = message => this.setState({ flash: true, message });

  render() {
    const { children } = this.props;
    const { showFlashMessage } = this;

    return (
      <ContextApi.Provider
        value={{
          ...this.state,
          showFlashMessage
        }}
      >
        {children}
      </ContextApi.Provider>
    );
  }
}

export const Consumer = ContextApi.Consumer;