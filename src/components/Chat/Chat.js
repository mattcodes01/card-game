import React from "react";
import styles from "./Chat.module.css";
import { db, functions } from "../../config/firebase-exports";

// import Users from "../../firebase/Users";

import Modal from "../Modal";
import AutoScroll from "./AutoScroll";
import Button from "../Button";
import Input from "../Form/Input";
import CreateUsernameForm from "../CreateUsernameForm";

import AuthContext from "../../auth/auth-context.js";

export default class Chat extends React.Component {
  static contextType = AuthContext;

  unsubscribe = null;

  scroller = React.createRef();

  state = {
    messages: [],
    chatMessage: "",
    modalShow: false
  };

  componentDidMount() {
    // https://firebase.google.com/docs/firestore/query-data/listen?authuser=0#view_changes_between_snapshots
    // this.loadMessages().then(messages => this.setState({ messages }));
    this.unsubscribeToChatMessages = db
      .collection("global-chat")
      .orderBy("updatedAt")
      .onSnapshot(
        snapshot => {
          this.setState({
            messages: snapshot.docs.map(doc => ({
              id: doc.id,
              text: doc.data().text,
              updatedAt: doc.data().updatedAt
            }))
          });
        },
        error => console.log(error)
      );
  }

  componentWillUnmount() {
    this.unsubscribeToChatMessages();
  }

  closeModal = () => {
    this.setState({ modalShow: false });
  };

  handleChatMessageChange = event => {
    this.setState({ chatMessage: event.target.value });
  };

  handleChatMessageKeyUp = event => {
    if (event.key === "Enter") this.sendChatMessage();
  };

  handleCreateUsernameFormSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.getAll("username")[0];

    if (username) {
      // const { user } = this.context;
      // console.log(this.context);

      const addMessage = functions.httpsCallable("addMessage");
      addMessage({ username: "sadf" }).then(console.log);

      // db.collection("users")
      //   .doc(user.uid)
      //   .set({
      //     username
      //     // updatedAt: new Date()
      //   });

      // Users.usernameExists(userName);
    }
  };

  sendChatMessage = () => {
    const { chatMessage } = this.state;
    // TODO: timestamp created after subscription reads new snapshot with null updatedAt?
    // https://firebase.google.com/docs/firestore/query-data/listen?authuser=0#events-local-changes
    // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    db.collection("global-chat")
      .doc()
      .set({
        text: chatMessage,
        updatedAt: new Date()
      })
      .then(this.setState({ chatMessage: "" }))
      .catch(console.log);
  };

  // loadMessages = () =>
  //   db
  //     .collection("global-chat")
  //     .get()
  //     .then(querySnapshot => {
  //       const messages = [];
  //       querySnapshot.forEach(doc => {
  //         messages.push({ id: doc.id, text: doc.data().text });
  //       });

  //       return messages;
  //     });

  render() {
    const hasUsername = false;
    const { chatMessage, messages, modalShow } = this.state;
    return (
      <div className={styles.Chat}>
        <AutoScroll>
          <ol className={styles["message-list"]}>
            {messages.map(message => (
              <li key={message.id} className={styles.message}>
                {`${message.updatedAt.toDate().toUTCString()}: ${message.text}`}
              </li>
            ))}
          </ol>
        </AutoScroll>
        <div className={styles["chat-input"]}>
          {hasUsername ? (
            <Input
              // disabled={!hasUsername}
              id="chat-msg-input"
              name="chat-msg-input"
              type="text"
              value={chatMessage}
              placeholder="Type a message..."
              onChange={this.handleChatMessageChange}
              onKeyUp={this.handleChatMessageKeyUp}
            />
          ) : (
            <button
              type="button"
              className={styles["chat-signup-box"]}
              onClick={() => this.setState({ modalShow: true })}
            >
              {"Create username to chat"}
            </button>
          )}
          <Button disabled={!hasUsername} onClick={this.sendChatMessage}>
            {"Send"}
          </Button>
        </div>
        <Modal show={modalShow} onClose={this.closeModal}>
          <div
            style={{
              padding: 20,
              width: 250,
              height: 250,
              borderRadius: 2,
              background: "white"
            }}
          >
            <CreateUsernameForm
              onSubmit={this.handleCreateUsernameFormSubmit}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
