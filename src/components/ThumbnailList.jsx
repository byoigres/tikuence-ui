import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "@inertiajs/react";

export default function ThumbnailList({ items }) {
  return (
    <ImageList cols={3}>
      {items.map((item) => (
        <ImageListItem key={item.id}>
          <Link href={`/lists/${item.id}`} key={item.id} style={{ display: 'block', height: '100%' }}>
            <img
              srcSet={item.thumbnails.sizes}
              src={item.thumbnails.name}
              alt={item.title}
              loading="lazy"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </Link>
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.username}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
