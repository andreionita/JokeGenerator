import './App.css';
import { Menu, Segment } from 'semantic-ui-react';
import React from 'react';
import JokeGenerator from './JokeGenerator';
import QuoteGenerator from './QuoteGenerator';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Random Joke Generator'
    }

  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  
  render() {
    const { activeItem } = this.state;
    return (
      <div className='App'>
        <div className='navbar'>
          <Menu inverted fluid widths={2} >
            <Menu.Item
              name='Random Joke Generator'
              active={activeItem === 'Random Joke Generator'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Random Quote Generator' 
              active={activeItem === 'Random Quote Generator'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </div>
        <div>
          {activeItem === 'Random Joke Generator' ? <JokeGenerator /> 
          : activeItem === 'Random Quote Generator' ? <QuoteGenerator /> : null }
        </div>
        <div className='footer'>
          <Footer />  
        </div>
      </div>
    )
  }
}

export default App;
