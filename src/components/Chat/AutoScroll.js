import React from "react";

export default class AutoScroll extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;
    this.autoScroll = true;

    this.createScrollerRef = node => {
      this.node = node;
    };
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    // TODO: turn input into uncontrolled or stop calling every time type character
    if (this.autoScroll) this.scrollToBottom();
  }

  scrollToBottom = () => {
    const { node } = this;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  };

  handleScroll = () => {
    // TODO: throttle / debounce?
    const { scrollHeight, scrollTop, offsetHeight } = this.node;
    const distanceFromBottom = scrollHeight - (scrollTop + offsetHeight);
    this.autoScroll = distanceFromBottom < 10;
  };

  render() {
    return (
      <div
        {...this.props}
        style={{ overflow: "auto", height: 200 }}
        ref={this.createScrollerRef}
        onScroll={this.handleScroll}
      />
    );
  }
}
