import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import { Layout } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import MenuItems from "./components/MenuItems";
import Text from "antd/lib/typography/Text";
import Game from "components/Game";
import Constructor from "components/Constructor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "90px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout
      style={{
        height: "100vh",
        overflow: "auto",
        justifyContent: "space-between",
      }}
    >
      <Router>
        <Header style={styles.header}>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/">
              <QuickStart isServerInfo={isServerInfo} />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>
            <Route exact path="/constructor">
              <Constructor />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
          <ToastContainer />
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          ???? You have questions? Ask them on the {""}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Tointer/zk-sieve"
          >
            Github
          </a>
        </Text>

        <Text style={{ display: "block" }}>
          ???? Read more about{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Tointer/zk-sieve"
          >
            zk-sieve
          </a>
        </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <img
    src="/logo.png"
    width="204px"
    height="53px"
    style={{ maxWidth: "131px" }}
    alt=""
  />
);

export default App;
