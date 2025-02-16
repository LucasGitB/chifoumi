import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { memo, useState } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { authService } from '../../services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { decodeToken } from 'react-jwt';

export const LoginForm = memo(() => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: login, isPending } = useMutation({
    mutationFn: async ({ username, password }) => {
      const response = await authService.login(username, password);
      return response.token;
    },
    onSuccess: (token) => {
      const decodedToken = decodeToken(token);
      const userId = decodedToken?._id;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      navigate('/home');
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || 'Erreur lors de la connexion.';
      setErrorMessage(errorMessage);
    },
  });

  /**
   * @type {import('react').FormEventHandler}
   **/
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const username = fd.get('username').toString();
    const password = fd.get('password').toString();

    login({ username, password });
  };

  return (
    <>
      <h1 className="font-bold text-3xl">Connexion</h1>

      <form className="flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="text-red-500 bg-red-200 p-2 rounded-lg flex gap-2">
            <ReportProblemIcon />
            {errorMessage}
          </div>
        )}

        <TextField
          required
          label="Pseudo"
          name='username'
        />

        <TextField          
          required
          label="Mot de passe"
          type="password"
          name='password'
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E3A8A",
            color: "white",
            "&:hover": { backgroundColor: "darkblue" },
            fontWeight: "bold",
          }}
          disabled={isPending}
          type="submit"
        >
          Se connecter
        </Button>

        <Link to="/register">Pas de compte ?</Link>
      </form>
    </>
  );
});