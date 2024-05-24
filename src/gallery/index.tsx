/* eslint-disable react/jsx-no-undef */
import 'react-image-gallery/styles/css/image-gallery.css';

import React from 'react';
import ImageGallery from 'react-image-gallery';

import LeftNav from './leftNav';
import RightNav from './rightNav';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

const renderLeftNav = (onClick: () => void, disabled: boolean) => (
  <LeftNav onClick={onClick} disabled={disabled} />
);

const renderRightNav = (onClick: () => void, disabled: boolean) => (
  <RightNav onClick={onClick} disabled={disabled} />
);

function MyGallery() {
  return (
    <div className="m-5 w-1/2">
      <ImageGallery
        items={images}
        showPlayButton={false}
        thumbnailPosition="right"
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
      />
    </div>
  );
}

export default MyGallery;
