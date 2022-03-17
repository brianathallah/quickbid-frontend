import { Menu, Layout } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserTypeBuyer, UserTypeSeller } from "../../utils/const";

const { Header } = Layout;

function HeaderQuickBid({ user }) {
  const [selected, setSelected] = useState("1");

  const handleClick = (e) => {
    setSelected(e.key);
  };

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={(e) => handleClick(e)}
        selectedKeys={[selected]}
      >
        <Menu.Item key={1}>
          <Link to="/">QuickBid</Link>
        </Menu.Item>
        {user.user_type === UserTypeBuyer && (
          <Menu.Item key={2}>
            <Link to="/product/bids">My Bid</Link>
          </Menu.Item>
        )}
        {user.user_type === UserTypeSeller && (
          <Menu.Item key={2}>
            <Link to="/product/listing">My Listing</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}

export default HeaderQuickBid;
