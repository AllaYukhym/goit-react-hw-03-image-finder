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
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const limit = 12;
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '30730953-a4b99fedc073d2eca0df8a6a8';

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      fetch(
        `${BASE_URL}?q=${this.state.query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${limit}`
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
          this.setState(prevState => ({
            images: [
              ...prevState.images,
              ...data.hits.map(({ id, webformatURL, largeImageURL }) => ({
                id,
                webformatURL,
                largeImageURL,
              })),
            ],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'regected' }));
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, images: [], page: 1 });
  };

  render() {
    const { images, status, error } = this.state;
    const totalPage = Math.ceil(500 / 12);

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'rejected' && <h1>{error.message}</h1>}
        {(status === 'resolved' || status === 'pending') && (
          <>
            <ImageGallery images={images} />
            {status === 'resolved' && this.state.page < totalPage && (
              <Button onClick={this.loadMore} />
            )}
            {images.length > 0 && status === 'pending' && <Loader />}
          </>
        )}
        {images.length == 0 && status === 'pending' && <Loader />}
        {/* <ToastContainer autoClose={3000} /> */}
      </>
    );
  }
}

{
  /* {images.length > 0 */
}
