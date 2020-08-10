import React, { Component } from "react";
import "./App.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  onDelete() {
    const { onDelete, name } = this.props;
    onDelete(name);
  }

  onEdit() {
    this.setState({ isEdit: true });
  }

  onEditSubmit(event) {
    event.preventDefault();
    this.props.onEditSubmit(
      this.name.value,
      this.post.value,
      this.props.name
    );

    this.setState({ isEdit: false });
  }

  render() {
    const { name, post } = this.props;
    return (
      <div className="container">
        {this.state.isEdit ? (
          <form onSubmit={this.onEditSubmit}>
            <input
              className="name-input"
              placeholder="Name"
              ref={name => (this.name = name)}
              defaultValue={name}
            />
            <textarea
              placeholder="Post"
              ref={post => (this.post = post)}
              defaultValue={post}
            />
            <br></br>
            <button>Save</button>
          </form>
        ) : (
          <div className="content">
          <div className="container">
            <h2>{name}</h2>
            <p>{post}</p>
            <button onClick={this.onEdit}>Edit</button>
            <button onClick={this.onDelete}>Delete</button>
          </div>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
