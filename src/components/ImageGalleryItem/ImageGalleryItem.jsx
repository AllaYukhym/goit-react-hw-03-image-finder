import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  static defaultProps = {
    initialShowModal: false,
  };

  static propTypes = {
    initialShowModal: PropTypes.bool,
  };

  state = {
    showModal: this.props.initialShowModal,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <>
        <GalleryItem>
          <GalleryItemImage
            src={this.props.src}
            onClick={this.toggleModal}
            alt="image"
          />
        </GalleryItem>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} src={this.props.modalSrc} />
        )}
      </>
    );
  }
}
