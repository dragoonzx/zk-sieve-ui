import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { PlaySquareOutlined, EditOutlined } from "@ant-design/icons";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/game">
        <NavLink to="/game" style={{ display: "flex", alignItems: "center" }}>
          <PlaySquareOutlined style={{ marginRight: "4px" }} /> Example Game
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/constructor">
        <NavLink to="/constructor">
          <EditOutlined style={{ marginRight: "4px" }} /> Captcha Constructor
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
