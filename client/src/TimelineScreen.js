import React, { Component } from "react";
import TestingCenter from "./contracts/TestingCenter.json";
import getWeb3 from "./getWeb3";

import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Button } from "@material-ui/core";

class TimelineScreen extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null ,events:[]};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );
      const deployedNetwork = TestingCenter.networks[networkId];
      const instance = new web3.eth.Contract(
        TestingCenter.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
    // this.setState({web3: web3, accounts: accounts, contract: instance })
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(10).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const result = await contract.getPastEvents(
      "allEvents",
      {fromBlock:0,toBlock:'latest'},
      function(error,events){ 
        console.log(events); })
      .then(function(events){
          console.log(events) // same results as the optional callback above
          // return JSON.stringify(events)
          return events
      }
    );
    // Update state with the result.

    this.setState({events:result });
    // this.setState({events:[{1:"12"},{1:"12"}]})
  };

  refreshEvents = async()=>{
    const { accounts, contract } = this.state;
    console.log(contract)
    const result = await contract.getPastEvents(
      "allEvents",
      {fromBlock:0,toBlock:'latest'},
      function(error,events){ 
        console.log(events); })
      .then(function(events){
          console.log(events[events.length-1].returnValues) // same results as the optional callback above
          return events
      }
    );
    this.setState({events:result})
  }
  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div className='App'>
        <Button onClick={()=>this.refreshEvents()} color="primary">Refresh</Button>
        {/* {this.state.events.map(event => <p>{event.returnValues._testResult}</p>)} */}

        <VerticalTimeline>
        {this.state.events.map(
          event=>
          <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{ background: event.returnValues._testResult=='Positive Results'
            ? "rgb(255, 51, 51)"
            : "rgb(0, 204, 153)",
          color: "#fff", }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          // date='2011 - present'
          iconStyle={{ background: event.returnValues._testResult=='Positive Results'
          ? "rgb(255, 51, 51)"
          : "rgb(0, 204, 153)", color: "#fff" }}
          
        >
          <h3 className='vertical-timeline-element-title' >
            Test Results: <strong>{event.returnValues._testResult}</strong>
          </h3>
          <h4 className='vertical-timeline-element-subtitle'>Institution: {event.returnValues._EA}</h4>
          <p>
            My Address: {event.returnValues._PatientSC}
          </p>
        </VerticalTimelineElement>
        )}
        </VerticalTimeline>
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default TimelineScreen;
