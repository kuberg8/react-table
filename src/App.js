import React, { useState, useEffect } from "react";
import Table from "./components/Table/Table";
import { generateData, debounce } from "./utils/utils";

const columns = [
  { name: "Название", key: "name" },
  { name: "Возраст", key: "age" },
  { name: "Дата", key: "date" },
];

function App() {
  const [users, setUsers] = useState(generateData());
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // const [debounceSearch, setDebounceSearch] = useState(null)

  const sort = (descending) => {
    const sortUsers = users.sort((a, b) =>
      descending ? b.age - a.age : a.age - b.age
    );
    setUsers([...sortUsers]);
    console.log("sort");
  };

  const searchUsers = search
    ? users.filter((user) => {
        return Object.values(user).some((item) =>
          item.toString().includes(search)
        );
      })
    : users;

  console.log("render");
  return (
    <div className="App">
      <div className="d-flex justify-content-around m-5">
        <button
          onClick={() => setUsers(generateData())}
          type="button"
          className="btn btn-primary col-3"
        >
          update
        </button>

        <div className="col-6">
          <input
            value={search}
            onInput={({ target }) => setSearch(target.value)}
            placeholder="Поиск"
            className="form-control"
          />
        </div>
      </div>
      <Table
        columns={columns}
        items={searchUsers}
        loading={loading}
        sort={sort}
        portionSize={3}
      />
    </div>
  );
}

export default App;
