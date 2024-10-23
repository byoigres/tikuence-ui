import React from 'react';

const TikTokVideoPlayer = ({ tiktokId }) => (
  <>
    <iframe
      id={tiktokId}
      src={`https://www.tiktok.com/player/v1/${tiktokId}`}
      style={{
        height: '100%',
      }}
    />
  </>
);

export default TikTokVideoPlayer;
