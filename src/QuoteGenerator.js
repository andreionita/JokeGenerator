import axios from 'axios';
import React from 'react';
import { Segment, Button, Grid, Container } from 'semantic-ui-react';
class QuoteGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
    }
  }

  handleQuoteButton() {
    axios.get('https://api.quotable.io/random')
      .then(response => {
        this.setState({
          quote: response.data.content,
          author: response.data.author,
        })
      })
      .catch(error => {
        console.log(error);
      })
      console.log(this.state.quote, this.state.author);
    
  }

  render() {
    return (
      <div>
        <Grid container columns='equal' divided='vertically' className='quote-app'>
          <Grid.Column>
            <Segment textAlign='center'>
              
                {this.state.quote === '' 
                ? <p className='quote-text'>Click the button to get a quote!</p> 
                : <p className='quote-text italic'>{this.state.quote}</p>}
              
                {this.state.author === '' ? '' : <p className='quote-author-text'>{this.state.author}</p>}
            </Segment>
          </Grid.Column>
        </Grid>
        <Container className='quote-button'>
          <Button basic onClick={() => this.handleQuoteButton()}>Get Quote</Button>
        </Container>
      </div>
    )
  }
}

export default QuoteGenerator;