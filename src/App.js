import React, { Component } from "react";
import "./App.css";
import Post from "./Post";
import AddPost from "./AddPost";
import Nav from "./Nav";
import Profile from "./Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const posts = [
  {
    id: 1,
    name: "Ricky Bobby",
    content: "If you ain't first, you're last!"
  },
  {
    id: 2,
    name: "Cal Naughton",
    content: "Shake 'n Bake!"
  },
  {
    id: 3,
    name: "Texas Ranger",
    content: "Chip, I'm gonna come at you like a spider monkey!"
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

  onAdd(name, content) {
    const posts = this.getPosts();
    posts.push({
      name,
      content
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

  onEditSubmit(name, content, prevName) {
    let posts = this.getPosts();
    posts = posts.map(post => {
      if (post.name === prevName) {
        post.name = name;
        post.content = content;
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
            <Route exact path="/">
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
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
        </Router>
      </div>
    );
  }
}

export default App;
