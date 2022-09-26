import { Checkbox } from 'semantic-ui-react';
import { Button, Container, SegmentGroup } from 'semantic-ui-react'
import { Grid, Rail, Segment } from 'semantic-ui-react'
import { Select } from 'semantic-ui-react'
import axios from 'axios';
import React, { Component } from 'react';

const jokeCategories = [
  { key: 'any', value: 'Any', text: 'Any' },
  { key: 'programming', text: 'Programming', value: 'Programming' },
  { key: 'miscellaneous', text: 'Miscellaneous', value: 'Miscellaneous' },
  { key: 'dark', text: 'Dark', value: 'Dark' },
  { key: 'pun', text: 'Pun', value: 'Pun' },
  { key: 'spooky', text: 'Spooky', value: 'Spooky' },
  { key: 'christmas', text: 'Christmas', value: 'Christmas' },
]

const jokeType = [
  { key: 'any', value: 'any', text: 'Any' },
  { key: 'single', text: 'Single', value: 'single' },
  { key: 'twopart', text: 'Two Part', value: 'twopart' },
]

class JokeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joke: {
        type: '',
        setup: '',
        delivery: '',
      },
      render: {
        renderPunchline: false,
        renderPunchlineButton: false,
      },
      jokeRequest: {
        jokeType: '',
        jokeCategory: 'Any',
        jokeBlacklistFlags: {
          nsfw: false,
          religious: false,
          political: false,
          racist: false,
          sexist: false,
          explicit: false,
        }
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  createLinkRequest() {
    let defaultRequest = "https://v2.jokeapi.dev/joke/";
    let blacklistString = '';

    let jokeCategory = this.state.jokeRequest.jokeCategory;
    let jokeBlacklistFlags = this.state.jokeRequest.jokeBlacklistFlags;
    let jokeType = this.state.jokeRequest.jokeType;
    defaultRequest = defaultRequest.concat(jokeCategory + "?");

    console.log(jokeBlacklistFlags);

    if (jokeBlacklistFlags.nsfw === true) {
      blacklistString = blacklistString.concat('nsfw,');
    }
    if (jokeBlacklistFlags.religious === true) {
      blacklistString = blacklistString.concat('religious,');
    }
    if (jokeBlacklistFlags.political === true) {
      blacklistString = blacklistString.concat('political,');
    }
    if (jokeBlacklistFlags.racist === true) {
      blacklistString = blacklistString.concat('racist,');
    }
    if (jokeBlacklistFlags.sexist === true) {
      blacklistString = blacklistString.concat('sexist,');
    }
    if (jokeBlacklistFlags.explicit === true) {
      blacklistString = blacklistString.concat('explicit,');
    }

    if (blacklistString !== '') {
      defaultRequest = defaultRequest.concat('blacklistFlags=');
      defaultRequest = defaultRequest.concat(blacklistString);
      defaultRequest = defaultRequest.slice(0, -1);
      defaultRequest = defaultRequest.concat('&');
    }


    if (jokeType === 'single') {
      defaultRequest = defaultRequest.concat('type=single');
    } else if (jokeType === 'twopart') {
      defaultRequest = defaultRequest.concat('type=twopart');
    }

    return defaultRequest;
  }

  handleInputChange(event, { value, category }) {
    if (category === 'joke-category') {
      this.setState({
        ...this.state,
        jokeRequest: {
          ...this.state.jokeRequest,
          jokeCategory: value,
        }
      })

    } else if (category === 'joke-type') {
      if (value === 'any') {
        this.setState({
          ...this.state,
          jokeRequest: {
            ...this.state.jokeRequest,
            jokeType: '',
          }
        })
      } else {
        this.setState({
          ...this.state,
          jokeRequest: {
            ...this.state.jokeRequest,
            jokeType: value,
          }
        })
      }
    }
  }

  handleCheckboxChange(event, { value }) {
    for (let key in this.state.jokeRequest.jokeBlacklistFlags) {
      if (key === value) {
        this.setState({
          ...this.state,
          jokeRequest: {
            ...this.state.jokeRequest,
            jokeBlacklistFlags: {
              ...this.state.jokeRequest.jokeBlacklistFlags,
              [key]: !this.state.jokeRequest.jokeBlacklistFlags[key],
            }
          }
        })
      }
    }
  }

  handleGetJokeButton() {
    const requestLink = this.createLinkRequest();
    axios.get(requestLink)
      .then(res => {
        const joke = res.data;
        if (joke.type === 'single') {
          this.setState({
            ...this.state,
            joke: {
              ...this.state.joke,
              type: joke.type,
              setup: joke.joke,
            },
            render: {
              renderPunchline: false,
              renderPunchlineButton: false,
            }
          })
        } else if (joke.type === 'twopart') {
          this.setState({
            ...this.state,
            joke: {
              type: joke.type,
              setup: joke.setup,
              delivery: joke.delivery,
            },
            render: {
              renderPunchline: false,
              renderPunchlineButton: true,
            }
          })
        }

      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    return (
      <div>
        <div classname="grid">
          <Grid container columns='equal' divided='vertically'>
            <Grid.Column width={10}>
              <Segment>
                <Container textAlign='center'>
                  <p className="joke-text">
                    {this.state.joke.setup === '' ? 'Click the button to get a joke!' : this.state.joke.setup}
                  </p>
                  {this.state.render.renderPunchline ? <p className="bold punchline-text">{this.state.joke.delivery}</p>
                    : this.state.render.renderPunchlineButton ?
                      <Button basic onClick={() => this.setState(
                        {
                          render: {
                            renderPunchline: true,
                            renderPunchlineButton: false
                          }
                        })}>
                        Reveal Punchline!
                      </Button>
                      : null}
                  
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column className='right-column' width={6}>
              <Segment>
                <Container textAlign='center'>
                  <p className="bold">Select joke categories: </p>
                  <Select
                    className="joke-select"
                    placeholder='Any'
                    category='joke-category'
                    options={jokeCategories}
                    value={this.state.jokeRequest.jokeCategory}
                    onChange={this.handleInputChange} />
                  <p className="bold">Select joke type: </p>
                  <Select
                    className="joke-select"
                    placeholder='Any'
                    category='joke-type'
                    options={jokeType}
                    value={this.state.jokeRequest.jokeType}
                    onChange={this.handleInputChange} />
                  <p className="bold">Select any categories to blacklist categories: </p>
                  <div>
                    <Checkbox
                      className="checkbox"
                      label='NSFW'
                      value='nsfw'
                      checked={this.state.jokeRequest.jokeBlacklistFlags.nsfw}
                      onChange={this.handleCheckboxChange} />
                    <Checkbox
                      className="checkbox"
                      label='Religious'
                      value='religious'
                      checked={this.state.jokeRequest.jokeBlacklistFlags.religious}
                      onChange={this.handleCheckboxChange} />
                    <Checkbox
                      className="checkbox"
                      label='Political'
                      value='political'
                      checked={this.state.jokeRequest.jokeBlacklistFlags.political}
                      onChange={this.handleCheckboxChange} />
                    <Checkbox
                      className="checkbox"
                      label='Racist'
                      value='racist'
                      checked={this.state.jokeRequest.jokeBlacklistFlags.racist}
                      onChange={this.handleCheckboxChange} />
                    <Checkbox
                      className="checkbox"
                      label='Sexist'
                      value='sexist'
                      checked={this.state.jokeRequest.jokeBlacklistFlags.sexist}
                      onChange={this.handleCheckboxChange} />
                    <Checkbox
                      className="checkbox"
                      label='Explicit'
                      value='explicit'
                      checked={this.state.jokeRequest.jokeBlacklistFlags.explicit}
                      onChange={this.handleCheckboxChange} />
                  </div>
                </Container>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
        <Container className="button-menu" textAlign='center'>
          <Button basic onClick={() => this.handleGetJokeButton()}>Get a Joke!</Button>
        </Container>
      </div>
    )
  }
}

export default JokeGenerator;