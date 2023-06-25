import React, { Component } from "react";
import randomColor from 'randomcolor';
import { BiSolidLike } from "react-icons/bi";
import "./App.css";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

class App extends Component {
  state = {
    senderMsg: "",
    messages: [], 
    defaluchatcount : 0,
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const { senderMsg } = this.state;
      if (senderMsg.trim() !== "") {
        const randomName = this.randomName();
        const newMessage = {
          name: randomName,
          message: senderMsg,
          color: randomColor(),
          likes: 0, // Initialize likes count to 0
        };

        this.setState((prevState) => ({
          messages: [...prevState.messages, newMessage],
          senderMsg: "",
        }));
      }
    }
  };

  randomName = () => {
    const length = Math.floor(Math.random() * user_list.length);
    const randomUser = user_list[length];
    return randomUser;
  };

  handleLike = (index) => {
    this.setState((prevState) => {
      const updatedMessages = [...prevState.messages];
      updatedMessages[index].likes += 1;
      return { messages: updatedMessages };
    });
  };


  handleLikes = () => {
    this.setState((prevState) => ({
      defaluchatcount: prevState.defaluchatcount + 1,
    }));
  };

  render() {
    const { senderMsg, messages ,defaluchatcount} = this.state;

    return (
      <div className="main-chat-container">
        <div className="container">
          <div className="header-container">
            <h1>Introductions</h1>
            <p>This Channel is For Company Wide Chatter</p>
          </div>
          <div>
            <div className="sender-msg-container">
              <h1 className="name">
                <span className="namelogo">PB</span>PubNub Bot
              </h1>
              <p className="sent-msg">
                Welcome to Chat..Send a Message now to start interacting with
                other users in the app..
              </p>
              <div className="like-container">
                  <button
                    className="like-button"
                    onClick={this.handleLikes}
                  >
                    <BiSolidLike />

                    <span className="likes-count">{defaluchatcount}</span>
                  </button>

                  
                  </div>
            </div>
            {messages.map((message, index) => (
              <div className="sender-msg-container" key={index}>
                <h1 className="name">
                  <span className="namelogo" style={{ backgroundColor: message.color }}>
                    {message.name.slice(0, 2).toUpperCase()}
                  </span>{message.name}
                </h1>
                <p className="sent-msg">{message.message}</p>
                <div className="like-container">
                  <button
                    className="like-button"
                    onClick={() => this.handleLike(index)}
                  >
                    <BiSolidLike />

                    <span className="likes-count">{message.likes}</span>
                  </button>

                  
                  </div>
                
              </div>
            ))}
          </div>

          <input
            type="text"
            value={senderMsg}
            onChange={(event) =>
              this.setState({ senderMsg: event.target.value })
            }
            onKeyDown={this.handleKeyPress}
            className="input"
            placeholder="Type a message..."
          />
        </div>
      </div>
    );
  }
}

export default App;
