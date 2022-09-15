import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class TopMenu extends React.Component {
  state = { activeItem: 'joke-generator' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted fluid widths={2} >
        <Menu.Item
          name='Random Joke Generator'
          active={activeItem === 'joke-generator'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Random Quote Generator' 
          active={activeItem === 'quote-generator'}
          onClick={this.handleItemClick}
        />

      </Menu>
    )
  }
}

export default TopMenu