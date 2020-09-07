import React, { useState, useEffect } from "react";
import "./App.css";
import { RiUserSearchFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";
import Axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Axios.get("https://api.github.com/users/example")
      .then((res) => {
        setUsername(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (search !== "") {
      Axios.get(`https://api.github.com/users/${search.replace(/ /g, "")}`)
        .then((res) => {
          setUsername(res.data);
          setNotFound(false);
        })
        .catch((err) => {
          setNotFound(true);
          console.log(err);
        });
    }
  }

  return (
    <div className="app">
      <form className="search-content" onSubmit={handleSubmit}>
        <input
          name="search"
          value={search}
          onChange={onChange}
          type="text"
          className="search-input"
          placeholder="Github User..."
        />
        <button className="btn btn-icon" type="submit">
          <RiUserSearchFill className="icon-search" size="2em" />
        </button>
      </form>
      {notFound === true ? (
        <h1 className="text-dark mt-5">User Not Found</h1>
      ) : (
        <div className="user-content row">
          <div className="col-3 d-flex justify-content-center align-items-center">
            <img
              src={username.avatar_url}
              alt="avatar-img"
              className="img-fluid"
            />
          </div>
          <div className="col-9 d-flex flex-column justify-content-around">
            <div>
              <h5 className="m-0">
                <b>{username.name || "Example"}</b>
              </h5>
              <small className="text-muted m-0 p-0">
                Created at{" "}
                {username.created_at !== undefined &&
                  username.created_at.slice(0, 4)}
                <AiFillGithub className="ml-2 mb-1" size="1.5em" />
              </small>
            </div>
            <p>{username.bio}</p>
            <div className="d-flex justify-content-between">
              <p>
                <b>{username.followers} Followers</b>
              </p>
              <p>
                <b>{username.following} Following</b>
              </p>
              <p>
                <b>{username.public_repos} Repositories</b>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
