import React from "react";
import styles from "./Chat.module.css";
import { db } from "../../config/firebase-exports";

export default class Chat extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.loadMessages().then(messages => this.setState({ messages }));
  }

  loadMessages = () =>
    db
      .collection("global-chat")
      .get()
      .then(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(doc => {
          messages.push({ id: doc.id, text: doc.data().text });
        });

        return messages;
      });

  render() {
    const { messages } = this.state;
    return (
      <div className={styles.Chat}>
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}
