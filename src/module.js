import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAudioPlayer } from "react-use-audio-player";

const { modules } = require("./modules.json");

const Module = (p) => {
  const [repeatNr, setRepeatNr] = useState(0);
  const [fileIndex, setFileIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const files = useRef(modules[p.voice][p.module]);
  const path = useRef(["modules", p.voice, p.module].join("/"));
  const filesLength = useRef(Object.keys(files.current).length);

  const maxRepeats = parseInt(p.repeat);

  const { load } = useAudioPlayer();

  const file = `${String(fileIndex).padStart(3, "0")}.mp3`;

  const barPercentageDone = Math.ceil(
    ((fileIndex + 1) / filesLength.current) * 100,
  );

  const text = files.current[file];

  const prev = useCallback(() => {
    setRepeatNr(0);

    if (fileIndex > 0) {
      setFileIndex(fileIndex - 1);
    } else if (fileIndex === 0) {
      setFileIndex(filesLength.current - 1);
    }
  }, [fileIndex]);

  const next = useCallback(() => {
    setRepeatNr(0);

    if (fileIndex < filesLength.current - 1) {
      setFileIndex(fileIndex + 1);
    } else if (fileIndex === filesLength.current - 1) {
      setFileIndex(0);
    }
  }, [fileIndex]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setRepeatNr(0);
  }, []);

  const playOnce = useCallback(
    (onend = () => false) => {
      const domain = "https://hub.shadowenglish.com"

      const loadPath = `${domain}/${path.current}/${file}`;

      load(loadPath, {
        autoplay: true,
        html5: true,
        format: "mp3",
        onend,
      });
    },
    [file, p.module, load],
  );

  const play = useCallback(
    (override) => {
      if (isPlaying === false && !override) return;

      setTimeout(
        () => {
          playOnce(() => {
            const time = Math.ceil(text.length / 20) * 1000 + 800;

            setTimeout(() => {
              setRepeatNr(repeatNr + 1);
            }, time);
          });
        },
        repeatNr === 0 ? 1000 : 0,
      );
    },
    [repeatNr, isPlaying, text, playOnce],
  );

  const start = useCallback(() => {
    setIsPlaying(true);

    setRepeatNr(0);
  }, []);

  const close = useCallback(() => {
    p.setModule(null);
  }, [p]);

  useEffect(() => {
    if (maxRepeats > 0 && isPlaying) {
      console.log("Playing #" + fileIndex);
      play();
    }
  }, [fileIndex, maxRepeats, isPlaying]);

  useEffect(() => {
    if (maxRepeats > 0) {
      if (repeatNr && repeatNr < maxRepeats) {
        play();
      } else if (repeatNr === maxRepeats) {
        setRepeatNr(0);

        const checkFile = files.current[`${String(fileIndex + 1).padStart(3, "0")}.mp3`];

        if (checkFile) {
          setFileIndex(fileIndex + 1);
        } else if (!checkFile && isPlaying) {
          setFileIndex(0);
          setIsPlaying(false);
        }
      }
    }
  }, [repeatNr, play, fileIndex, maxRepeats, isPlaying]);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <button className={"abtn"} onClick={close} style={styles.logo}>
          <img style={styles.logoImg} src="/logo.png" alt="ShadowEnglish.com - Easy English" />
        </button>

        <button className={"abtn"} style={styles.close} onClick={close}>
          ✕
        </button>

        <div style={styles.title}>
          <span style={styles.mtitle}>{p.module}</span> ({fileIndex + 1}/
          {filesLength.current})
        </div>

        <div style={styles.module}>
          <div style={styles.bar}>
            <div
              style={{ ...styles.barDone, width: `${barPercentageDone}%` }}
            />
          </div>
        </div>
      </div>

      <div style={styles.text}>{text}</div>

      <div style={styles.translation}></div>

      <div style={styles.controls}>
        <select
          value={p.repeat}
          onChange={(e) => p.setRepeat(e.target.value)}
          style={{
            ...styles.autoplay,
            opacity: maxRepeats === 0 ? 0.4 : 1,
          }}
        >
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index}>
              {index === 0 && "Autoplay OFF"}
              {index > 0 && `Autoplay ON (x${index} times)`}
            </option>
          ))}
        </select>

        <button className={"abtn"} style={styles.arr} onClick={prev}>
          &lt; Prev
        </button>

        {maxRepeats === 0 && (
          <button
            className={"abtn"}
            style={styles.play}
            onClick={() => playOnce()}
          >
            Play
          </button>
        )}

        {maxRepeats > 0 && (
          <>
            {isPlaying ? (
              <button
                className={"abtn"}
                style={{ ...styles.play, ...styles.pause }}
                onClick={stop}
              >
                Playing {repeatNr + 1}/{maxRepeats}
                <div style={styles.buttonDescr}>STOP</div>
              </button>
            ) : (
              <button className={"abtn"} style={styles.play} onClick={start}>
                Play
                <div style={styles.buttonDescr}>x{maxRepeats} times</div>
              </button>
            )}
          </>
        )}

        <button className={"abtn"} style={styles.arr} onClick={next}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

const hex2a = (hexString) => {
  // Convert hexadecimal string to ArrayBuffer
  const arrayBuffer = new Uint8Array(hexString.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16))).buffer;

  // Create a TextDecoder with UTF-8 encoding
  const textDecoder = new TextDecoder('utf-8');

  // Decode ArrayBuffer to UTF-8 encoded string
  const utf8String = textDecoder.decode(arrayBuffer);

  return utf8String;
}

const styles = {
  card: {
    padding: 20,
    paddingTop: 30,
    width: 400,
    maxWidth: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifiyContent: "center",
    aligItems: "center",
    height: "95vh",
  },
  header: {
    // height: "60px",
    // display: "flex",
    // flexDirection: "row",
    // flex: 1,
    width: "calc(100% + 15px)",
    // aligItems: "center",
    // justifyContent: "center",
    // justifyContent: "space-between",
    // textAlign: "center",
    margin: "-10px",
    // backgroundColor: "rgba(255 255 255 / 5%)",
    borderRadius: 3,
    padding: "10px 20px 5px 20px",
    position: "relative",
    paddingLeft: 65,
    paddingRight: 65,
  },
  logo: {
    // width: "50px",
    // width: "20px",
    height: "50px",
    // flex: 1,
    // display: "flex",
    // background: "blue"
    // display: "none",
    position: "absolute",
    left: "0px",
    top: "0px",
    cursor: "pointer",
    background: "none",
    outline: "none",
    border: "none",
    display: "block",
    padding: 0,
    margin: 0,
  },
  close: {
    height: "50px",
    width: "50px",
    position: "absolute",
    right: "-10px",
    top: "0px",
    lineHeight: "50px",
    color: "rgba(255 255 255 / 40%)",
    fontSize: "22px",
    fontWeght: "bold",
    textAlign: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  logoImg: {
    // width: "50px",
    height: "50px",
    display: "block",
    margin: 0,
  },
  module: {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alighItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: "left",
    color: "#888",
    marginBottom: 5,
  },
  mtitle: {
    display: "inline-block",
    textOverflow: "ellipsis",
    overflow: "hidden",
    // height: "44px",
    whiteSpace: "nowrap",
    maxWidth: "calc(100% - 60px)",
    verticalAlign: "bottom",
  },
  breadcrumbs: {
    textAlign: "left",
    color: "rgba(255 255 255 / 40%)",
    fontSize: 12,
    fontWeight: 500,
    // paddingBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItens: "center",
    height: "100%",
    paddingRight: 10,
  },
  bar: {
    flex: 1,
    minWidth: 1,
    height: 6,
    marginRight: "2px",
    borderRadius: 100,
    background: "rgba(255 255 255 / 10%)",
    position: "relative",
  },
  barDone: {
    // background: "rgb(3,155,192)",
    background:
      "linear-gradient(180deg, rgba(3,155,192,1) 40%, rgba(127,217,34,1) 160%)",
    minWidth: 1,
    height: 6,
    borderRadius: 100,
    position: "absolute",
    top: 0,
    left: 0,
  },
  text: {
    paddingTop: 100,
    color: "#fff",
    fontSize: 26,
    fontWeight: 400,
    lineHeight: "32px",
    // height: "40%",
    flex: 1,
    // display: "flex",
    textAlign: "center",
    background: "none",
    border: "none",
  },
  translation: {
    color: "#888",
    textAlign: "center",
    flex: 1,
  },
  controls: {
    width: "100%",
    height: "30%",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  autoplay: {
    width: "100%",
    // background: "rgba(255, 255, 255, 0.1)",
    // borderRadius: 3,
    height: 40,
    display: "block",
    // width: "100%",
    border: "none",
    appeareance: "none",
    // color: "#333",
    textAlign: "center",
    // margin: "5px 0",
    fontWeight: "bold",
    letterSpacing: "0.4px",
    fontSize: 10,
    textTransform: "uppercase",
    paddingLeft: 10,
    paddingRight: 10,
    overflow: "hidden",
    textOverflow: "ellipsis",
    position: "absolute",
    left: 0,
    right: 0,
    margin: "auto",
    top: -60,
    background: "none",
    // border: "none",
    color: "rgba(3,155,192,1)",
    // "-webkit-appearance": "none",
    outline: "none",
  },
  arr: {
    background: "none",
    textTransform: "uppercase",
    // opacity: 0.4,
    color: "#888",
    fontSize: 12,
    fontWeight: 500,
    height: 160,
    border: "none",
    //width: 160,
    lineHeight: "160px",
    // fontFamily: "monospace",
    textAlign: "center",
    alighItems: "center",
    display: "table-row",
    cursor: "pointer",
  },
  play: {
    position: "relative",
    width: 160,
    height: 160,
    borderRadius: 100,
    margin: "auto",
    border: "none",
    color: "#fff",
    fontSize: 20,
    lineHeight: "160px",
    fontWeight: "bold",
    textTransform: "uppercase",
    // background: "rgb(3,155,192)",
    // background:
    //   "linear-gradient(180deg, rgba(3,155,192,1) 30%, rgba(127,217,34,1) 130%)",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.5)",

    // background: "rgb(3,155,192)",
    background:
      "linear-gradient(180deg, rgba(3,155,192,1) 40%, rgba(127,217,34,1) 160%)",
    cursor: "pointer",
  },
  pause: {
    background: "#e83c52",
  },
  buttonDescr: {
    position: "absolute",
    textAlign: "center",
    bottom: "45px",
    left: 0,
    right: 0,
    margin: "auto",
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "12px",
    lineHeight: "24px",
    // textTransform: "initial"
  },
};

export default Module;
