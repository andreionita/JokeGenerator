import React from "react";
import { Segment, Container, List } from "semantic-ui-react";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <Segment inverted>
          <Container textAlign="left">
            <List>
              <List.Item>Made using React, Semantic UI, and Axios</List.Item>
              <List.Item>APIs used: 
                <a href="https://sv443.net/jokeapi/v2/"> Joke API </a> 
                and 
                <a hreft="https://api.quotable.io/"> Quote API </a>
                </List.Item>
              <List.Item>
                Coded by 
                <a href="https://github.com/andreionita"> Andrei Ionita</a>
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Footer;