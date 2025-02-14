import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { authService } from '../../services/auth.service';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(username, password);

      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.error || 'Erreur lors de la connexion.'
        );
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <>
      <h1 className='font-bold text-3xl'>Connexion</h1>

      <form className='flex flex-col gap-6 mt-8' onSubmit={handleSubmit}>
        {errorMessage && (
          <div className='text-red-500 bg-red-200 p-2 rounded-lg flex gap-2'>
            <ReportProblemIcon />
            {errorMessage}
          </div>
        )}

        <TextField
          required
          id='outlined-required'
          label='Pseudo'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          required
          id='outlined-required'
          label='Mot de passe'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant='contained'
          sx={{
            backgroundColor: '#1E3A8A',
            color: 'white',
            '&:hover': { backgroundColor: 'darkblue' },
            fontWeight: 'bold',
          }}
          type='submit'>
          Se connecter
        </Button>

        <Link to='/register'>Pas de compte ?</Link>
      </form>
    </>
  );
};
