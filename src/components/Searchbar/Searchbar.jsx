import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static defaultProps = {
    initialQuery: '',
  };

  static propTypes = {
    initialQuery: PropTypes.string.isRequired,
  };

  state = {
    query: this.props.initialQuery,
  };

  handleInputChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      return toast.error('Please enter query.', {
        duration: 2000,
        position: 'top-right',
      });
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>
              <ImSearch />
            </SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="searchWord"
            value={this.state.query}
            onChange={this.handleInputChange}
            autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
