import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useGet } from "@brightleaf/react-hooks";
import {
  Button,
  Column,
  Columns,
  Container,
  Control,
  Hero,
  HeroBody,
  Section,
  Title,
  SubTitle
} from "@brightleaf/elements";
import { Form, TextInput } from "react-form-elements";
import "./styles.css";

function App() {
  const [deck, setDeck] = useState("slide-deck");
  const { getUrl: getNext } = useGet(
    `https://kev-pi.herokuapp.com/slide/${deck}/next`
  );
  const { getUrl: getPrevious } = useGet(
    `https://kev-pi.herokuapp.com/slide/${deck}/previous`
  );
  return (
    <>
      <Hero isBold isInfo>
        <HeroBody>
          <Title>Remote Control</Title>
          <SubTitle>Press the buttons to see some magic happen!</SubTitle>
        </HeroBody>
      </Hero>
      <Section className="App">
        <Container>
          <Columns>
            <Column isHalf>
              <Button
                isPrimary
                isLarge
                isFullWidth
                className="is-tall"
                onClick={e => {
                  e.preventDefault();
                  getPrevious(
                    `https://kev-pi.herokuapp.com/slide/${deck}/previous`
                  );
                }}
              >
                &lt;&lt; Previous
              </Button>
            </Column>
            <Column isHalf>
              <Button
                isPrimary
                isLarge
                isFullWidth
                className="is-tall"
                onClick={e => {
                  e.preventDefault();
                  console.log("click next");
                  getNext(`https://kev-pi.herokuapp.com/slide/${deck}/next`);
                }}
              >
                Next &gt;&gt;
              </Button>
            </Column>
          </Columns>
          <hr />
          <Columns>
            <Column isFull>
              <Form
                name="slidepicker"
                onSubmit={data => {
                  console.info("Hi", data);
                  setDeck(data.slides);
                }}
              >
                <TextInput
                  className="field control"
                  labelClassName="label is-large"
                  inputClassName="input is-large"
                  name="slides"
                  initialValue=""
                  label="Slide Deck"
                />
                <Control>
                  <Button isInfo>Connect Slide Deck</Button>
                </Control>
              </Form>
            </Column>
          </Columns>
        </Container>
      </Section>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
