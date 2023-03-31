import { useState } from "react";
import { UserMenu } from "./user-menu";
import { AddRowButton } from "./add-row-button";
import { AnchorElType } from "../shared/types";

import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

interface HeaderProps {
  setOpen: (value: boolean) => void;
}

const Header = ({ setOpen }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<AnchorElType>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <AddRowButton setOpen={setOpen} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Crud App
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <UserMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
export type { HeaderProps };
