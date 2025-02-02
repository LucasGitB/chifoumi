import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, CircularProgress, Alert } from '@mui/material';
import { HeaderTitle } from '../components/HeaderTitle';
import { decodeToken } from 'react-jwt';

export const CreateGamePage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchMatchStatus = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (!token) {
  //         setErrorMessage("Veuillez vous connecter.");
  //         setLoading(false);
  //         navigate("/login");
  //         return;
  //       }

  //       const decodedToken = decodeToken(token);
  //       const userId = decodedToken?._id;

  //       if (!userId) {
  //         setErrorMessage("ID utilisateur manquant dans le token.");
  //         setLoading(false);
  //         navigate("/login");
  //         return;
  //       }

  //       const response = await axios.get("http://localhost:3002/matches", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       const availableMatch = response.data.find(
  //         (match) => match.user2 === null && match.user1._id !== userId
  //       );

  //       setMatchInProgress(availableMatch || null);
  //     } catch (error) {
  //       setErrorMessage("Erreur lors de la récupération des parties.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMatchStatus();
  // }, [navigate]);

  const handlePlayGame = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Veuillez vous connecter.');
        setLoading(false);
        return;
      }

      const decodedToken = decodeToken(token);
      const userId = decodedToken?._id;
      setUserId(userId);

      if (!userId) {
        setErrorMessage('ID utilisateur manquant dans le token.');
        setLoading(false);
        return;
      }

      if (matchInProgress) {
        const response = await axios.post(
          `http://localhost:3002/matches/${matchInProgress._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          navigate(`/matches/${matchInProgress._id}`);
        }
      } else {
        const response = await axios.post(
          'http://localhost:3002/matches',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201 && response.data._id) {
          navigate(`/matches/${response.data._id}`);
        }
      }
    } catch (error) {
      console.error('Erreur Axios:', error.response || error);
      setErrorMessage(
        error.response?.data?.message ||
          'Erreur lors de la création de la partie.'
      );
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return <CircularProgress />;
  // }

  // if (errorMessage) {
  //   return <Alert severity="error">{errorMessage}</Alert>;
  // }

  return (
    <>
      <HeaderTitle title={'Jouer'} route='/home' showArrow={true} />
      <div className='flex w-full gap-10 mt-10'>
        <div className='flex flex-col bg-white p-8 shadow-lg w-full rounded-lg'>
          <h2 className='text-xl font-bold mb-4'>Créer une partie</h2>
          <Button
            sx={{ backgroundColor: '#1E3A8A' }}
            variant='contained'
            onClick={handleCreateGame}
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Créer une partie'}
          </Button>
        </div>
        <div className='flex flex-col bg-white p-8 shadow-lg w-full rounded-lg'>
          <h2 className='text-xl font-bold mb-4'>Historique des parties</h2>
          <Button
            sx={{ backgroundColor: '#1E3A8A' }}
            variant='contained'
            onClick={() => navigate('/history')}>
            Voir l'historique des parties
          </Button>
        </div>
      </div>
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
    </>
  );
};
