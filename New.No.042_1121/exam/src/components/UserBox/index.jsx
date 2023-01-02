import { useEffect, useState } from "react";
import styled from "styled-components";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import Regist from "./Regist";

export default function UserBox({ users, setUsers, user, setUser }) {
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserStyled>
      <Regist users={users} setUsers={setUsers}></Regist>
      <LogIn users={users} setUser={setUser}></LogIn>
      <LogOut user={user} setUser={setUser}></LogOut>
    </UserStyled>
  );
}

const UserStyled = styled.div``;
