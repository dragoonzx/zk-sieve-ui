import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { useMoralisFile } from "react-moralis";
import { toast } from "react-toastify";

const { Option } = Select;

const Constructor = () => {
  const { moralisFile, saveFile } = useMoralisFile();

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
  });

  const handleAnswersSet = (v, t) => {
    setAnswers({
      ...answers,
      [t]: v,
    });
  };

  const submitQuestion = async () => {
    const { answerA, answerB, answerC, answerD } = answers;
    const object = {
      question,
      answerA,
      answerB,
      answerC,
      answerD,
    };

    try {
      await saveFile(
        `${Date.now()}.json`,
        { base64: window.btoa(JSON.stringify(object)) },
        { saveIPFS: true },
      );
      const hash = moralisFile.hash();
      console.log(hash);
    } catch (err) {
      console.error(err);
    } finally {
      toast.success("Success");
    }
  };

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
            src="https://giphy.com/embed/l3q2Uzjt0QB4oL7l6"
            width="480"
            height="268"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <p>
            <a
              style={{ opacity: 0.7 }}
              href="https://giphy.com/gifs/jerseydemic-l3q2Uzjt0QB4oL7l6"
            >
              * our solution not so easy to cheat on
            </a>
          </p>
        </div>
        <div style={{ display: "flex" }}>
          <h1 style={{ fontSize: "64px", fontWeight: "bold" }}>
            Captcha constructor
          </h1>
        </div>
        <div>
          <div
            style={{
              border: "1px solid #1F1D36",
              padding: "8px",
              minWidth: "700px",
              minHeight: "500px",
              marginTop: "24px",
            }}
          >
            <div>
              <p style={{ opacity: 0.7 }}>Write question:</p>
              <Input
                placeholder="Question"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
              />
            </div>
            <div
              style={{
                marginTop: "36px",
                borderTop: "1px solid #1F1D36",
                position: "relative",
                height: "400px",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexBasis: "50%",
                  paddingLeft: "4px",
                }}
              >
                <span style={{ fontSize: "22px" }}>A</span>
                <Input
                  placeholder="Answer A"
                  style={{ height: "40px", marginTop: "64px", width: "90%" }}
                  onChange={(e) => handleAnswersSet(e.target.value, "answerA")}
                  value={answers.answerA}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexBasis: "50%",
                  paddingLeft: "4px",
                }}
              >
                <span style={{ fontSize: "22px" }}>B</span>
                <Input
                  placeholder="Answer B"
                  style={{ height: "40px", marginTop: "64px", width: "90%" }}
                  onChange={(e) => handleAnswersSet(e.target.value, "answerB")}
                  value={answers.answerB}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexBasis: "50%",
                  paddingLeft: "4px",
                }}
              >
                <span style={{ fontSize: "22px" }}>C</span>
                <Input
                  placeholder="Answer C"
                  style={{ height: "40px", marginTop: "64px", width: "90%" }}
                  onChange={(e) => handleAnswersSet(e.target.value, "answerC")}
                  value={answers.answerC}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexBasis: "50%",
                  paddingLeft: "4px",
                }}
              >
                <span style={{ fontSize: "22px" }}>D</span>
                <Input
                  placeholder="Answer D"
                  style={{ height: "40px", marginTop: "64px", width: "90%" }}
                  onChange={(e) => handleAnswersSet(e.target.value, "answerD")}
                  value={answers.answerD}
                />
              </div>
              <span
                style={{
                  width: "100%",
                  height: "1px",
                  background: "#1F1D36",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></span>
              <span
                style={{
                  width: "1px",
                  height: "100%",
                  background: "#1F1D36",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></span>
            </div>
          </div>
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "22px" }}>Choose right answer:</span>
            <Select defaultValue="A" style={{ width: 120, marginTop: "4px" }}>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </div>
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              marginTop: "36px",
            }}
            type="primary"
            onClick={() => submitQuestion()}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Constructor;
