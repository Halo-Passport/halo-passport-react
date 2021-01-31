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
  state = { storageValue: 0, web3: null, accounts: null, contract: null ,events:null};

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
          console.log(events[events.length-1]) // same results as the optional callback above
          return JSON.stringify(events[events.length-1])
      }
    );
    // Update state with the result.
    this.setState({events:result });
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
    this.setState({event:result})
  }
  

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div className='App'>
        <Button variant="contained" color="primary" onPress={this.refreshEvents}>Refresh</Button>
        <p>{this.state.events}</p>
        <VerticalTimeline>
          <VerticalTimelineElement
            className='vertical-timeline-element--work'
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date='2011 - present'
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className='vertical-timeline-element-title'>
              Creative Director
            </h3>
            <button onClick={this.refreshEvents}>Refresh</button>
            <h4 className='vertical-timeline-element-subtitle'>Miami, FL</h4>
            <p>
              Creative Direction, User Experience, Visual Design, Project
              Management, Team Leading
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className='vertical-timeline-element--work'
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date='2011 - present'
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className='vertical-timeline-element-title'>
              Creative Director
            </h3>
            <h4 className='vertical-timeline-element-subtitle'>Miami, FL</h4>
            <p>
              Creative Direction, User Experience, Visual Design, Project
              Management, Team Leading
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className='vertical-timeline-element--work'
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date='2011 - present'
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className='vertical-timeline-element-title'>
              Creative Director
            </h3>
            <h4 className='vertical-timeline-element-subtitle'>Miami, FL</h4>
            <p>
              Creative Direction, User Experience, Visual Design, Project
              Management, Team Leading
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default TimelineScreen;
