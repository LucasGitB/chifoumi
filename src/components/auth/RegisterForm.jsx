import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { memo, useState } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { authService } from '../../services/auth.service';
import { useMutation } from '@tanstack/react-query';

export const RegisterForm = memo(() => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: register, isPending } = useMutation({
    mutationFn: async ({ username, password }) => {
      return await authService.register(username, password);
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      const errorMessage = 
        error.response?.data?.error || "Erreur lors de l'inscription.";
      setErrorMessage(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const username = fd.get('username').toString();
    const password = fd.get('password').toString();
    const confirmPassword = fd.get('confirmPassword').toString();

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    register({ username, password });
  };

  return (
    <>
      <h1 className="font-bold text-3xl">Inscription</h1>

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
          name="username"
        />

        <TextField
          required
          label="Mot de passe"
          type="password"
          name="password"
        />

        <TextField
          required
          label="Confirmation du mot de passe"
          type="password"
          name="confirmPassword"
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
          S'inscrire
        </Button>

        <Link to="/login">Déjà un compte ?</Link>
      </form>
    </>
  );
});