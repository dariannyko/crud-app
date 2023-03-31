import { useAppDispatch } from "../store/store";
import { logout } from "../store/auth-slice/auth-slice";
import { AnchorElType } from "../shared/types";
import { userToken } from "../shared/const";

import { Menu, MenuItem } from "@mui/material";

interface UserMenuProps {
  anchorEl: AnchorElType;
  setAnchorEl: (value: AnchorElType) => void;
}

const UserMenu = ({ anchorEl, setAnchorEl }: UserMenuProps) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(userToken);
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
};

export { UserMenu };
