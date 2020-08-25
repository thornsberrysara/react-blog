import React, { Component } from "react";
import "./App.css";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onAdd(this.name.value, this.post.value);
    this.name.value = "";
    this.post.value = "";
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.onSubmit}>
        <h2 className="add-header">Add Post</h2>
        <input placeholder="Name" ref={name => (this.name = name)} />
        <textarea placeholder="Post" ref={post => (this.post = post)} />
        <br></br>
        <button className="add">Add</button>
      </form>
      </div>
    );
  }
}

export default AddPost;