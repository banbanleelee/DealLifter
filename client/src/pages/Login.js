import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const styles = { width: '250%' };
React.createElement("div", { style: styles });

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <section className='section'>    
        <div className="columns is-mobile is-centered">
            <div className="card ">
                <header className="card-header">
                    <p className="card-header-title is-centered">
                        <span className="icon-text">
                            <span className="icon has-text-info">
                                <i className="fas fa-info-circle"></i>
                            </span>
                            <span>Log In</span>
                        </span>
                    </p>
                </header>
                <section className="card-content ">
                    {data ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                    <form onSubmit={handleFormSubmit}>
                        <div className="field ">
                            <label className="label">Username</label>
                            <div className="control has-icons-left is-expanded">
                                <div style={styles}> 
                                    <input 
                                    className="input is-info" 
                                    name="username" 
                                    placeholder="Your username"
                                    type="text"  
                                    value={formState.name}
                                    onChange={handleChange}
                                    />
                                </div>
                                <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                    
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <div style={styles}> 
                                    <input 
                                    className="input is-info" 
                                    placeholder="********"
                                    name="password"
                                    type="password"  
                                    value={formState.password}
                                    onChange={handleChange}
                                    />
                                </div>    
                                <span className="icon is-small is-left">
                                <i className="fas fa-key"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link is-info" type="submit">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light">
                                    <Link to="/">
                                    Cancel
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </form>
                    )}
                    {error && (
                    <div className="is-warning">
                        {error.message}
                    </div>
                    )}
                </section>
            </div>         
        </div>
    </section>
  );
};

export default Login;
