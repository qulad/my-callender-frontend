import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PathConstants from 'routes/PathConstant';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('access_token');

    navigate(PathConstants.LOGIN);
  }, [navigate]);

  return null;
};

export default Logout;
