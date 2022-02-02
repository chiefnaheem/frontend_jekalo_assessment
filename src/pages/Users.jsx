/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/userContext';
import FormRow from '../components/FormRow';
import User from '../components/User';
const Users = () => {
  const [values, setValues] = useState({ first_name : '', last_name: '', username: '', date_of_birth: '' });
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [username, setUsername] = useState('')
  // const [dateOfBirth, setDateOfBirth] = useState('');
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { isLoading, showAlert, fetchUsers, createUser } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, username, date_of_birth } = values;
    if (first_name && last_name && username && date_of_birth) {
      console.log(values)
      await createUser(values);
      setValues({ first_name: '', last_name: '', username: '', date_of_birth: '' });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <Wrapper className='page'>
        {showAlert && (
          <div className='alert alert-danger'>
            there was an error, please try again
          </div>
        )}
        <form className='user-form' onSubmit={handleSubmit}>
          {/* First name */}
          <div>
          <label className="form-label">
            First name
          </label>
          <FormRow
            type='text'
            name='first_name'
            value={values.first_name}
            handleChange={handleChange}
            horizontal
            placeholder='First name'
          />
          </div>
          {/* Last name */}
          <div>
          <label className="form-label">
            Last name
          </label>
          <FormRow
            type='text'
            name='last_name'
            value={values.last_name}
            handleChange={handleChange}
            horizontal
            placeholder='Last name'
          />
          </div>
          {/* username */}
          <div>
          <label className="form-label">
            Username
          </label>
          <FormRow
            type='text'
            name='username'
            value={values.username}
            handleChange={handleChange}
            horizontal
            placeholder='Username'
          />
          </div>
          {/* Date of Birth */}
          <div>
          <label className="form-label">
            Date of Birth
          </label>
            <FormRow
            type='text'
            name='date_of_birth'
            value={values.date_of_birth}
            handleChange={handleChange}
            horizontal
            placeholder='Date of Birth'
          />
          </div>
          
          <button type='submit' className='btn' disabled={isLoading}>
            {isLoading ? 'SUBMITTING' : 'SUBMIT'}
          </button>
        </form>

        <User />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  padding: 3rem 0;
  .user-form {
    background: var(--white);
    display: grid;
    row-gap: 1rem;
    column-gap: 0.5rem;
    align-items: center;
    margin-bottom: 3rem;
    border-radius: var(--borderRadius);
    padding: 1.5rem;
    .form-input {
      padding: 0.75rem;
    }
    .form-input:focus {
      outline: 1px solid var(--primary-500);
    }
    .form-row {
      margin-bottom: 0;
    }
    .form-label{
      color: purple;
      font-size: 1.1rem;
    }
    .btn {
      padding: 0.75rem;
    }
    @media (min-width: 776px) {
      grid-template-columns: 1fr 1fr;
      .btn {
        height: 50%;
        width: 150px;
        padding-bottom: 2rem;
      }
      column-gap: 2rem;
    }
  }
  .alert {
    max-width: var(--max-width);
    margin-bottom: 1rem;
  }
`;

export default Users;