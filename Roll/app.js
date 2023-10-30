import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      content: 'Wybierz opcję z menu.',
    };
  }

  changeContent = (newContent) => {
    this.setState({ content: newContent });
  };

  render() {
    return (
      <div className="container">
        <div className="buttons">
          <button className="button" onClick={() => this.changeContent('Zawartość 1')}>
            Opcja 1
          </button>
          <button className="button" onClick={() => this.changeContent('Zawartość 2')}>
            Opcja 2
          </button>
          <button className="button" onClick={() => this.changeContent('Zawartość 3')}>
            Opcja 3
          </button>
          <button className="button" onClick={() => this.changeContent('Zawartość 4')}>
            Opcja 4
          </button>
          <button className="button" onClick={() => this.changeContent('Zawartość 5')}>
            Opcja 5
          </button>
          <button className="button" onClick={() => this.changeContent('Zawartość 6')}>
            Opcja 6
          </button>
        </div>
        <div className="content">
          {this.state.content}
        </div>
      </div>
    );
  }
}

export default App;
