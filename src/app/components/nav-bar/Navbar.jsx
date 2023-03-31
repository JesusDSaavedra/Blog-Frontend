import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLogout } from "../../../store/auth/thunks";

import "./Navbar.css";

export const Navbar = () => {
  const { type, name } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    // console.log("dkjfndjnfjdf");
    dispatch(startLogout());
  };

  const opendminPage = () => {
    navigate("/admin", { replace: true });
  };

  const itemsUser = [
    {
      key: "1",
      typeuser: [1],
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => opendminPage()}
          // href="https://www.antgroup.com"
        >
          Administrar blog
        </a>
      ),
    },
    {
      key: "2",
      typeuser: [1, 2],
      label: (
        <div onClick={logOut}>
          <LogoutOutlined style={{ marginRight: "5px", color: "#D01802" }} />
          Cerrar sesion
        </div>
      ),
    },
  ];

  const checkItemsUser = () => {
    const itemCurrentUser = itemsUser.filter((item) =>
      item.typeuser.includes(type)
    );
    return itemCurrentUser;
  };

  return (
    <nav>
      <div className="navbar-left">
        <p>{name}</p>
      </div>
      <div className="navbar-right">
        <Dropdown
          menu={{
            items: checkItemsUser(),
          }}
          placement="bottomRight"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <Button icon={<SettingOutlined />} />
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
