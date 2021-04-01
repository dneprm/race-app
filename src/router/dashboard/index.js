const MainLayout = () => import('../../layouts/MainLayout');
const RacePage = () => import(/* webpackChunkName: "race" */'../../pages/RacePage');
const NotFoundPage = () => import('../../pages/NotFoundPage');

export default {
    path: '',
    name: 'dashboard',
    component:  MainLayout,
    redirect: { name: 'race' },
    children: [
      {
        path: '/race',
        name: 'race',
        component: RacePage,
      },
      {
        path: '/not-found',
        name: 'not-found',
        component: NotFoundPage,
      },
      {
        path: '*',
        redirect: '/not-found',
      },
    ],
};
