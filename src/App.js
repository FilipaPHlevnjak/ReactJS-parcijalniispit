import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AccountInfo from "./components/AccountInfo";
import RepositoriesList from "./components/RepositoriesList";

function App() {
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);

  function searchItem() {
    if (searchUser.trim() === "") {
      alert("Unesite željeni pojam!");
    }

    fetch(`https://api.github.com/users/${searchUser}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });

    fetch(`https://api.github.com/users/${searchUser}/repos`)
      .then((response) => response.json())
      .then((data) => {
        setRepositories(data);
      });
  }

  function resetItem() {
    setUser(null);
    setRepositories([]);
  }

  return (
    <div className="main-screen">
      <h1>GitHub username:</h1>
      <p>
        <input
          type="text"
          value={searchUser}
          placeholder="e.g.facebook"
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </p>
      <Button variant="secondary" onClick={searchItem}>
        Go!
      </Button>
      {user !== null && (
        <AccountInfo
          avatarURL={user.avatar_url}
          name={user.name}
          location={user.location}
          bio={user.bio}
        />
      )}
      {repositories.length > 0 && (
        <RepositoriesList repositories={repositories} />
      )}
      {user !== null && (
        <Button variant="secondary" onClick={resetItem}>
          Reset
        </Button>
      )}
    </div>
  );
}

export default App;
