import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { adminInfo } from "./adminInfo.js";
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useNavigate } from "react-router-dom";
 
export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({ address: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (login.address !== adminInfo.email || login.password !== adminInfo.password) {
      setErrorMessage("You have to check your information");
    } else {
      navigate('/dashboard');
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          onChange={(e) => setLogin({ ...login, address: e.target.value })}
          name="email"
          label="Email address"
        />
        <TextField
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}></Stack>
      <button
      style={{
        width:350,
        height:45,
        border:"none",
        cursor:"pointer",
        backgroundColor:"#112678",
        color:"white",
        borderRadius:10
        }}
        onClick={handleLogin}
      >
        Login
      </button>
    </>
  );

  return (
   

    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420 }}>
          <Typography variant="h4">Welcome Admin</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}></Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
    
  );
}
