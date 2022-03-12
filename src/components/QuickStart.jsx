import React from "react";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const QuickStart = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "620px",
        }}
      >
        <div style={{ width: "480px" }}>
          <iframe
            src="https://giphy.com/embed/DgphnkWIDqCEo"
            width="480"
            height="240"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "64px", fontWeight: "bold" }}>zk-Sieve</h1>
          <p
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            No more bots in your P2E games with help of zk-snarks
          </p>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "12px" }}
          >
            <NavLink to="/game">
              <Button type="primary" style={{ marginRight: "8px" }}>
                Try game
              </Button>
            </NavLink>
            <NavLink to="/constructor">
              <Button>Create captcha</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickStart;
