import React, { Component } from "react";
import "./App.css";
import Post from "./Post";
import AddPost from "./AddPost";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const posts = [
  {
    id: 1,
    name: "Ricky Bobby",
    post: "If you ain't first, you're last!"
  },
  {
    id: 2,
    name: "Cal Naughton",
    post: "Shake 'n Bake!"
  },
  {
    id: 3,
    name: "Texas Ranger",
    post: "Chip, I'm gonna come at you like a spider monkey!"
  }
];

localStorage.setItem("posts", JSON.stringify(posts));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse(localStorage.getItem("posts"))
    };
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }
  componentDidMount() {
    const posts = this.getPosts();
    this.setState({ posts });
  }

  getPosts() {
    return this.state.posts;
  }

  onAdd(name, post) {
    const posts = this.getPosts();
    posts.push({
      name,
      post
    });
    this.setState({ posts });
  }

  onDelete(name) {
    const posts = this.getPosts();
    const filteredPosts = posts.filter(post => {
      return post.name !== name;
    });
    this.setState({ posts: filteredPosts });
  }

  onEditSubmit(name, post, prevName) {
    let posts = this.getPosts();
    posts = posts.map(post => {
      if (post.name === prevName) {
        post.name = name;
        post.post = post;
      }
      return post;
    });
    this.setState({ posts });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Nav />
              <AddPost onAdd={this.onAdd} />
              {this.state.posts.map(post => {
                return (
                  <Post
                    key={post.id}
                    {...post}
                    onDelete={this.onDelete}
                    onEditSubmit={this.onEditSubmit}
                  />
                );
              })}
        </Router>
      </div>
    );
  }
}

export default App;
