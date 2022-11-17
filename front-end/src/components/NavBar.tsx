import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useCookies } from 'react-cookie';

import './NavBar.scss';

const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'user_id', 'logged_in']);
  const username = cookies.username;

  const navigate = useNavigate();

  const logout = () => {
    axios.get('/logout')
      .then(data => {
        removeCookie('username', {path: '/'});
        removeCookie('user_id', {path: '/'});
        removeCookie('logged_in', {path: '/'});
        navigate('/');
      })
  };

  return (
    <nav>
      <div className='logo'>
        TinyURLs<i className="fa-solid fa-scissors"></i>
      </div>

      <div className='side_nav'>
        <span>Welcome, <span className='username'>{username}</span>!</span>&nbsp;&nbsp;
        <button data-testid='logout' type='submit' className='logout' onClick={logout}>Logout</button>
      </div>
      
    </nav>
  );
}
 
export default NavBar;