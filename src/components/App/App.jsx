import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  static defaultProps = {
    initialQuery: '',
    initialPage: 1,
    initialImages: [],
    initialError: null,
    initialStatus: 'idle',
  };

  static propTypes = {
    initialQuery: PropTypes.string.isRequired,
    initialPage: PropTypes.number.isRequired,
    initialImages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
    initialError: PropTypes.any,
    initialStatus: PropTypes.string.isRequired,
  };

  state = {
    query: this.props.initialQuery,
    page: this.props.initialPage,
    images: this.props.initialImages,
    error: this.props.initialError,
    status: this.props.initialStatus,
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      // images: [...prevState.images, ...this.state.images],
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=30730953-a4b99fedc073d2eca0df8a6a8&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`No images by query ${this.state.query}`)
          );
        })
        .then(data =>
          this.setState({
            images: data.hits.map(({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })),
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'regected' }));
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  render() {
    const { images, status, error } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'pending' && <Loader />}

        {status === 'rejected' && <h1>{error.message}</h1>}

        {status === 'resolved' && (
          <>
            <ImageGallery images={images} />
          </>
        )}
        <Button onClick={this.loadMore} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
