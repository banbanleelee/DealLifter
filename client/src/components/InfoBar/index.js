import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './categories';
import categories from './categories';
import './deals';
import deals from './deals';

import { useQuery, useMutation } from '@apollo/client';
import { GET_DEALS_BY_KEYWORD } from '../../utils/queries';
import { CREATE_SEARCH, ADD_TO_SEARCH_HISTORY } from '../../utils/mutations';


const InfoBar = () => {
  const [formState, setFormState] = useState({
    keyword: '',
  });
  


  // const [createSearch, {error:searchError, data: searchData}] = useMutation(CREATE_SEARCH);
  const [addToSearchHistory, {error: historyError, data: historyData}] = useMutation(ADD_TO_SEARCH_HISTORY);

 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {

      const { history } = await addToSearchHistory({
        variables: { ...formState },
      })
      
    } catch (error) {

    }
    window.location.assign(`/results/${formState.keyword}`)
  };


  return (
    <nav className='navbar'>
      <div className='navbar-menu'>

        <div className='navbar-item has-dropdown is-hoverable'>
          <a className="navbar-link">
            Categories
          </a>
          <div className="navbar-dropdown">
            {categories.map((category) => (
              <div className='navbar-item'>
                <Link to={category.link}>
                  <span>{category.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className='navbar-item has-dropdown is-hoverable'>
          <a className="navbar-link">
            Deals of the Day
          </a>
          <div className="navbar-dropdown">
            {deals.map((deal) => (
              <div className='navbar-item'>
                <Link to={deal.link}>
                  <span>{deal.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="navbar-item navbar-end">
          <div className="field has-addons">
            <p className="control">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Search the deals"
                  autoComplete="off"
                  name="keyword"
                  value={formState.keyword}
                  onChange={handleChange}
                />
                <div className="field">
                  <div className="buttons my-2">
                    <button className="button is-warning">
                      <span className="icon is-small">
                        <i className="fas fa-check"></i>
                      </span>
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </form>
            </p>
            <p className="control">
              <button className="button is-rounded is-warning">
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InfoBar;