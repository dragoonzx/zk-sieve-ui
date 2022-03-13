import React, { useEffect, useState } from "react";
import { useNFTBalances } from "react-moralis";
import { Button, Modal, Select } from "antd";
import { FireTwoTone, StarOutlined } from "@ant-design/icons";

const { Option } = Select;

const Game = () => {
  const [adNfts, setAdNfts] = useState(null);
  const { getNFTBalances, data, error } = useNFTBalances();

  const getAllNFTs = async () => {
    // Get Data from NFTPort
    try {
      const res = await fetch("https://api.nftport.xyz/v0/nfts?chain=polygon", {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_NFT_PORT,
        },
      });
      const data = await res.json();
      setAdNfts(data);
      console.log(adNfts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllNFTs();
  }, []);

  const [selectedNFT, setSelectedNFT] = useState(null);
  const activeTokenId =
    selectedNFT && selectedNFT.token_address + selectedNFT.token_id;

  console.log(data);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);

  const registerToNFTGame = (collectionAddress, nftId) => {
    if (!selectedNFT) {
      return;
    }
    console.log(collectionAddress, nftId);

    setIsModalVisible(true);

    setTimeout(() => {
      setIsQuestionModalVisible(true);
    }, 5000);
  };

  return (
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
          allow="fullscreen"
          frameBorder="0"
          height="315"
          src="https://giphy.com/embed/KHb04tuKq6BDg1pIlv/video"
          width="480"
        ></iframe>
      </div>
      <div style={{ display: "flex" }}>
        <h1 style={{ fontSize: "64px", fontWeight: "bold" }}>NFT Fighter</h1>
      </div>
      <div>
        {error && <>{JSON.stringify(error)}</>}
        <Button type="primary" onClick={() => getNFTBalances()}>
          Refetch NFTs
        </Button>
      </div>
      <div
        style={{
          marginTop: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "36px" }}>Choose your fighter</h2>
        {data?.result ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "24px",
            }}
          >
            {data.result.map((v) => (
              <div
                key={v.token_address + v.token_id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "16px",
                  position: "relative",
                  background:
                    activeTokenId === v.token_address + v.token_id
                      ? "rgba(0, 0, 0, 0.2)"
                      : "",
                  borderRadius: "8px",
                }}
                onClick={() => setSelectedNFT(v)}
              >
                <img
                  src={v.metadata?.image}
                  style={{ height: "64px" }}
                  alt=""
                />
                <p>{v.name}</p>
                {selectedNFT &&
                activeTokenId === v.token_address + v.token_id ? (
                  <FireTwoTone
                    style={{ position: "absolute", top: "8px", right: "12px" }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <Button
          disabled={!selectedNFT}
          icon={<StarOutlined />}
          type="primary"
          onClick={() => registerToNFTGame()}
        >
          Start fight
        </Button>

        <Modal
          title="Fight!!!"
          centered
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <iframe
            src="https://giphy.com/embed/l0Iy87qFTu0gDegw0"
            width="480"
            height="265"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Modal>
        <Modal
          title="Web3 Captcha"
          centered
          visible={isQuestionModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                setIsModalVisible(false);
                setIsQuestionModalVisible(false);
              }}
            >
              Submit
            </Button>,
          ]}
        >
          <div>
            <p style={{ fontSize: "19px", fontWeight: "bold" }}>Question: </p>
          </div>
          <div style={{ marginTop: "28px" }}>
            <p style={{ fontSize: "19px", fontWeight: "bold" }}>
              Your answer:{" "}
            </p>
            <Select
              defaultValue="Answer A"
              style={{ width: 120, marginTop: "12px" }}
            >
              <Option value="A">Answer A</Option>
              <Option value="B">Answer B</Option>
              <Option value="C">Answer C</Option>
              <Option value="D">Answer D</Option>
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Game;
