import axios from "axios";
import { useState } from "react";

export function useFetchUser() {
  const [users, setUsers] = useState([]);

  function fetchUsers() {
    axios.get("http://localhost:3001/users").then((resault) => {
      setUsers(resault.data);
    });
  }
  return { users, setUsers, fetchUsers };
}
