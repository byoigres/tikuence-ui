import React, { forwardRef } from 'react';

const TikTokVideoPlayer = forwardRef(({ tiktokId }, ref) => (
  <iframe
    ref={ref}
    id={tiktokId}
    src={`https://www.tiktok.com/player/v1/${tiktokId}`}
    style={{
      display: 'block',
      height: '100%',
      width: '100%',
      border:  'none',
    }}
  />
));

export default TikTokVideoPlayer;
