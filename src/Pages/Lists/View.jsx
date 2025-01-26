import React, { useState, useRef, useEffect } from "react";
import { usePage, Link as InertiaLink } from '@inertiajs/react';
import MainLayout from "../../components/Layouts/MainLayout";
import Box from '@mui/material/Box';
// import Fab from '@mui/material/Fab';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TikTokVideoPlayer from "../../components/TikTokVideoPlayer";

// https://developers.tiktok.com/doc/embed-player?enter_method=left_navigation

const VideoContainer = ({ children, className, index }) => (
  <Box
    data-name="VideoContainer"
    data-snap-index={index}
    className={className}
    sx={{
      position: 'relative',
      width: '100%',
      height: '98vh',
      scrollSnapAlign: 'start', 
    }}
  >
    {children}
  </Box>
);

const View = () => {
  const {
    props: {
      modal
    }
  } = usePage();
  const scrollContainerRef = useRef(null);
  const iframeRefs = useRef([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [interceptedVideoIndex, setCurrentInterceptedVideoIndex] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function postPlayerMessage(iframe, type, value = '') {
    iframe.contentWindow.postMessage({
      type,
      value,
      "x-tiktok-player": true
    }, "*");
  }

  useEffect(() => {
    const handleMessage = (event) => {
      const { data } = event;
      // console.log(JSON.stringify(data, null, 2));

      if (data["x-tiktok-player"] == true) {
        if (data.type !== "onCurrentTime") {
          console.log(JSON.stringify(data, null, 2));
        }

        if (data.type === "onPlayerReady") {
          setIsPlayerReady(true);
        }

        if (data.type === "onStateChange") {
          // Consider using the following values for the state:
          // -1: init
          // 0: ended
          // 1: playing
          // 2: paused
          // 3: buffering
          if (data.value === 1) {
            if (!hasPlayedVideo) {
              setHasPlayedVideo(true);
            }
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.dataset?.snapIndex) {
          console.log("Snapped to:", entry.target.dataset.snapIndex, {
            isPlayerReady, hasPlayedVideo
          });
          setCurrentInterceptedVideoIndex(parseInt(entry.target.dataset.snapIndex));
        }
      });
    };

    const scrollContainer = scrollContainerRef.current;
    const items = scrollContainer.querySelectorAll(".scroll-item");

    const options = {
      root: scrollContainer, // Use the scrollable container as the root
      threshold: 0.5, // 50% of the item must be visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [isPlayerReady, hasPlayedVideo]);

  useEffect(() => {
    if (interceptedVideoIndex !== null && interceptedVideoIndex !== currentVideoIndex) {
      postPlayerMessage(iframeRefs.current[currentVideoIndex], "pause");
      postPlayerMessage(iframeRefs.current[interceptedVideoIndex], "play");
      setCurrentVideoIndex(interceptedVideoIndex);
    }
  }, [interceptedVideoIndex, currentVideoIndex]);

  return (
    <>
      <InertiaLink href={`/lists/${modal.list.id}/details`}>Add video to list</InertiaLink>
      <Box
        sx={{
          height: '100vh',
          overflowY: (!isPlayerReady || !hasPlayedVideo) ? 'hidden' : 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
        }}
        data-name="VideosBox"
        ref={scrollContainerRef}
      >
        {modal.videos.map((video, index) => (
          <VideoContainer
            className="scroll-item"
            index={index}
            key={index}
          >
            <TikTokVideoPlayer
              key={video.tiktok_id}
              tiktokId={video.tiktok_id}
              ref={(el) => {
                iframeRefs.current[index] = el;
              }}
            />
          </VideoContainer>
        ))}
      </Box>
      {/* <Fab
        color="primary"
        disabled={!isPlayerReady || !hasPlayedVideo}
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: '5rem',
          right: '1rem'
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
      <Fab
        color="primary"
        disabled={!isPlayerReady || !hasPlayedVideo}
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem'
        }}
        onClick={playNext}
      >
        <ArrowDownwardIcon />
      </Fab>
      <div style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 99999
      }}>
        Current Video Index: {currentVideoIndex}
        <br />
        Player Ready: {isPlayerReady ? 'Yes' : 'No'}
        <br />
        Played Video: {hasPlayedVideo ? 'Yes' : 'No'}
        <br />
        Playing: {isPlaying ? 'Yes' : 'No'}
        <br />
        Intercepted Video Index : {interceptedVideoIndex}
      </div> */}
    </>
  );
};

View.layout = (page) => <MainLayout children={page} />;

export default View;