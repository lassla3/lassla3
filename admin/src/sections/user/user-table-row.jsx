import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { GoArrowSwitch } from "react-icons/go";
import { useRouter } from 'src/routes/hooks';

export default function UserTableRow({ row, BanUser }) {
  const { id, name, avatarUrl, company, role, isVerified,isActive } = row;
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

 



  return (
    <>
      <TableRow hover tabIndex={-1} style={{cursor:"pointer"}} >
        <TableCell padding="checkbox">
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company}</TableCell>

        <TableCell>{role}</TableCell>

        <TableCell align="center">{isVerified}</TableCell>
        <TableCell align="center">{isActive?<p style={{color:"green"}}>yes</p>:<p style={{color:"red"}}>No</p>}</TableCell>
        <TableCell align="center"></TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={()=>{BanUser(id);handleCloseMenu()}} sx={{ color: 'blue' }}>
          <GoArrowSwitch style={{ marginRight: 10 }} />
          Swith statue
        </MenuItem>
      </Popover>
    </>
  );
}