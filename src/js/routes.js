
import HomePage from '../pages/home.jsx';
import MeetingPage from '../pages/meeting.jsx';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/meeting/:id/',
    component: MeetingPage,
  },
];

export default routes;
