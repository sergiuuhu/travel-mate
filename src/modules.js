import React from "react";
import { FixedSizeList as List } from "react-window";

const { modules } = require("./modules.json");

const Row = ({ index, data }) => {
  const item = data[index];

  return (
    <button className={"abtn"} style={styles.module} onClick={item.onClick}>
      {item.title} {emojis[index]}
      {/* <div style={styles.moduleBorder} /> */}
    </button>
  );
};
const Modules = (p) => {
  const list = Object.keys(modules[p.voice]).map((item) => ({
    title: decodeURIComponent(item),
    onClick: () => p.setModule(item),
  }));

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.logo}>
          <img
            style={styles.logoImg}
            width={80}
            height={80}
            src="/logo.png"
            alt="ShadowEnglish.com - Easy English"
          />
        </div>

        <div style={styles.title}>ShadowEnglish.com</div>

        <div style={styles.subtitle}>
          Start speaking English fluently & fast.
          <br />
          Simply listen and repeat out loud.
        </div>

        <a className="abtn" style={styles.shop} href="https://shop.shadowenglish.com/" target="_blank">
        🎁 Shop 
        </a>
      </div>

      <div style={styles.preferences}>
        <div style={styles.preference}>
          <select
            value={p.voice}
            onChange={(e) => p.setVoice(e.target.value)}
            style={styles.preferenceOptions}
          >
            {p.voices.map((voice, index) => (
              <option key={index} value={voice}>
                {voice} {voice.includes("British") ? "🇬🇧" : "🇺🇸"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.modules}>
        <List
          itemCount={list.length}
          itemData={list}
          height={3780}
          itemSize={54}
        >
          {Row}
        </List>
      </div>

      <div style={styles.footer}>
        <p>
          ShadowEnglish.com includes 59 modules of the most common phrases and expressions used in the English language that you can use for deep learning and accent training.
        </p>

        <p>
          © 3M DIGITAL LTD 2024.
          <br />
          <br />
          Registered in England and Wales (No. 11681453).
          <br />
          Registered Office: 71-75 Shelton Street, Covent Garden, WC2H 9JQ, London, United Kingdom."
        </p>
      </div>
    </div>
  );
};

const emojis = [
  "👋",
  "👋",
  "🙏",
  "🤝",
  "🙇‍♂️",
  "🤔",
  "👍👎",
  "🗺️",
  "👍👎",
  "🤝",
  "🤷‍♂️",
  "🤨",
  "🎉",
  "⌚",
  "🤐",
  "💬",
  "💰",
  "💬",
  "🍽️",
  "❓",
  "📍",
  "🚑",
  "💪",
  "🛍️",
  "😨",
  "💼",
  "📚",
  "🏨",
  "🤔",
  "📝",
  "📞",
  "🗓️",
  "🤲",
  "🤔",
  "💬",
  "🎉",
  "😔",
  "🤷‍♂️",
  "😢",
  "😐",
  "😞",
  "☀️☔",
  "🌟",
  "🤒",
  "😊😢",
  "😡",
  "😅",
  "💡",
  "💌",
  "🙏",
  "🚦",
  "🤞",
  "😤",
  "🔄",
  "😱",
  "🤲",
  "😔",
  "🚫",
  "🤷‍♂️❓",
];

const styles = {
  shop: {
    position: "absolute",
    top: "5px",
    right: 0,
    background: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "3px",
    fontWeight: 600
  },
  preferences: {
    padding: "10px 0 0 0",
    display: "flex",
    justifiyContent: "space-between",
    gap: "10px",
  },
  preference: {
    // display: "flex",
    // gap: "10px",
    // alignItems: "center",
    width: "100%",
  },
  preferenceTitle: {
    textAlign: "left",
    width: "100%",
    fontSize: 14,
    // textTransform: "uppercase",
    // fontWeight: 500,
    color: "#fff",
    margin: "0 0 2px 0",
    // letterSpacing: ".4px",
  },
  preferenceOptions: {
    width: "100%",
    // background: "rgba(255, 255, 255, 0.1)",
    background: "#039bc0",
    borderRadius: 3,
    height: 40,
    display: "block",
    // width: "100%",
    border: "none",
    appeareance: "none",
    textAlign: "center",
    margin: "5px 0",
    fontWeight: 500,
    outline: "none",
    fontSize: 14,
    paddingLeft: 10,
    color: "#fff",
    paddingRight: 10,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  otg: {
    borderRadius: 3,
    background: "#e4a25c",
    position: "relative",
    height: 60,
    minHeight: 60,
    color: "#333",
    display: "block",
    padding: "10px 0 10px 70px",
    margin: "40px 0 20px 0",
    fontSize: "14px",
    lineHeight: "20px",
  },
  otgLogo: {
    width: "50px",
    height: "50px",
    borderRadius: 3,
    position: "absolute",
    top: 5,
    left: 5,
  },
  otgTitle: {
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 0,
  },
  otgDescription: {
    fontWeight: 500,
  },
  footer: {
    padding: 20,
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 10,
    lineHeight: "14px",
    textAlign: "center",
  },
  card: {
    padding: 20,
    paddingTop: 30,
    width: 400,
    maxWidth: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifiyContent: "center",
  },
  header: {
    textAlign: "center",
  },
  logoImg: {
    // width: "50px",
    height: "80px",
    display: "block",
    margin: "5px auto",
  },
  title: {
    fontSize: 20,
    lineHeight: "30px",
    fontWeight: 600,
    color: "#fff",
    marginBottom: 3,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 400,
    color: "#fff",
    marginBottom: 0,
  },
  modules: {
    padding: "10px 0 30px 0",
  },
  moduleTitle: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: 500,
    color: "#888",
    margin: "15px 0 5px 0",
    letterSpacing: ".4px",
  },
  module: {
    fontSize: 18,
    lineHeight: "24px",
    fontWeight: 500,
    color: "#fff",
    textAlign: "left",
    padding: "15px 20px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: 3,
    margin: "5px 0 5px 0",
    cursor: "pointer",
    width: "100%",
    position: "relative",
    textOverflow: "ellipsis",
    overflow: "hidden",
    height: "54px",
    whiteSpace: "nowrap",
  },
  moduleBorder: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: 5,
    height: "100%",
    background:
      "linear-gradient(180deg, rgba(3,155,192,1) 40%, rgba(127,217,34,1) 160%)",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  moduleDescription: {
    fontSize: 14,
    lineHeight: "20px",
    color: "rgba(255 255 255 / 60%)",
    fontWeight: 400,
    paddingLeft: "10px",
    paddingTop: 10,
  },
  partDescription: {
    display: "block",
    margin: "2px 0 8px 0",
    opacity: "60%",
  },
};

export default Modules;
