/* eslint-disable react/jsx-no-undef */
import 'react-image-gallery/styles/css/image-gallery.css';

import React from 'react';
import ImageGallery from 'react-image-gallery';

import LeftNav from './leftNav';
import RightNav from './rightNav';

type GalleryImage = {
  original: String;
  thumbnail: String;
};

type IGalleryProps = {
  images: Array<GalleryImage>;
};

const renderLeftNav = (onClick: () => void, disabled: boolean) => (
  <LeftNav onClick={onClick} disabled={disabled} />
);

const renderRightNav = (onClick: () => void, disabled: boolean) => (
  <RightNav onClick={onClick} disabled={disabled} />
);

function Gallery(props: IGalleryProps) {
  return (
    <div className="mx-auto py-4">
      <div className="flex">
        <ImageGallery
          items={props.images}
          showPlayButton={false}
          thumbnailPosition="right"
          renderLeftNav={renderLeftNav}
          renderRightNav={renderRightNav}
          showIndex={true}
        />
      </div>
    </div>
  );
}

export default Gallery;
