import { useGlobalContext } from "../context/userContext";
import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

const User = () => {
  const { users, isLoading, deleteUser } = useGlobalContext();
  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (users?.length < 1) {
    return (
      <EmptyContainer>
        <h5>Currently, there are no user registered.</h5>
      </EmptyContainer>
    );
  }

  return (
    <>
      <h5>Users</h5>
      <Container>
        {users?.map((item) => {
          const { _id: id, name_prefix, username, first_name, last_name, date_of_birth } = item;
          console.log(date_of_birth)
          return (
  
            <article key={id} className="user">
              <div className="logo">

                <span className="icon">{name_prefix}</span>
                <span className="username">{username}</span>
              </div>
              <span className="names">{`${last_name} ${first_name}`}</span>
              <span className="date">{date_of_birth}</span>
              <div className="action-div">

                <button className=" delete-btn" type="button" onClick={() => deleteUser(username)}>
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })}
      </Container>
    </>
  );
};
const EmptyContainer = styled.section`
  text-align: center;
  h5 {
    text-transform: none;
  }
  span {
    color: var(--primary-500);
  }
`;
const Container = styled.section`
  .user {
    background: var(--white);
    border-radius: var(--borderRadius);
    margin-bottom: 2rem;
    display: grid;
    padding: 2rem 0;
    justify-content: center;
    text-align: center;
  }
  .logo{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 120px;
  }
  .icon {
    background: var(--primary-500);
    ${'' /* display: block; */}
    border-radius: 50%;
    color: var(--white);
    font-size: 2rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem; 
    }
  }
  span {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
  .username {
    font-weight: 600;
    margin: 0;
  }
  .date {
    color: var(--grey-500);
  }

  .delete-btn {
    color: var(--red-dark);
    border-color: transparent;
    border-radius: var(--borderRadius);
    cursor: pointer;
    background: transparent;
  }
  .delete-btn {
    font-size: 1rem;
    line-height: 1.15;
    margin-bottom: -3px;
  }
  .action-div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr;
    .icon {
      ${'' /* background-color: blue; */}
      ${'' /* padding: 10px 6px 10px 6px; */}
      color: white;
      ${'' /* border: 0.2px solid purple; */}
      ${'' /* border-radius: 50%; */}
      font-weight: 900;
      font-size: 20px;
    }
    background: var(--white);
    ${'' /* border-bottom-left-radius: var(--borderRadius); */}
    ${'' /* border-bottom-right-radius: var(--borderRadius); */}
    .user {
      border-radius: 0;
      justify-content: left;
      text-align: left;
      border-bottom: 1px solid var(--grey-200);
      grid-template-columns: 1fr 1fr 150px 100px 100px;
      align-items: center;
      padding: 1rem 1.5rem;
      column-gap: 1rem;
      margin-bottom: 0;
    }
    .user:last-child {
      border-bottom: none;
    }
    span {
      font-size: var(--small-text);
    }
    .names,
    .username {
      font-weight: 400;
      text-transform: capitalize;
    }
    .date {
      font-weight: 400;
      color: var(--grey-500);
    }
    .action-div {
      margin-left: 1rem;
      justify-content: left;
    }
  }
`;
export default User;
