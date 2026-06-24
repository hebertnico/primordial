import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

type MusicPlayerHandle = {
  play: () => Promise<void>;
  pause: () => void;
};

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.preload = "auto";
  }, []);

  useImperativeHandle(ref, () => ({
    play: async () => {
      const audio = audioRef.current;
      if (!audio) return;

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Audio play failed:", err);
      }
    },
    pause: () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.pause();
      setIsPlaying(false);
    },
  }));

  return (
    <audio
      ref={audioRef}
      src="music/gondang.mp3"
      onEnded={() => setIsPlaying(false)}
    />
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
