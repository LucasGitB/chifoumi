import { Outlet, Link as RouterLink } from 'react-router-dom';

export const AuthenticatedLayout = () => {
  return (
    <>
      <nav className='bg-blue-900 p-8'>
        <RouterLink to='/home'>
          <img src="/assets/logo-chifoumi.png" alt='' className='w-1/10' />
        </RouterLink>
        <div className='float-right'>
          <RouterLink to='/home' className='text-white mx-2'>
            Home
          </RouterLink>
          <RouterLink to='/statistics' className='text-white mx-2'>
            Statistics
          </RouterLink>
          <RouterLink to='/create-game' className='text-white mx-2'>
            Create Game
          </RouterLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
