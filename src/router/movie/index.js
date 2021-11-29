export default {
  path: '/movie',
  component: () => import('@/views/Movie'),
  children: [
    {
      path: 'city',
      component: () => import('@/components/City'),
    },
    {
      path: 'nowplaying',
      component: () => import('@/components/Nowplaying'),
    },
    {
      path: 'comingSoon',
      component: () => import('@/components/ComingSoon'),
    },
    {
      path: 'search',
      component: () => import('@/components/Search'),
    },
    {
      path: 'detail/1/:movieId',
      components: {
        default: () => import('@/components/Nowplaying'),
        detail: () => import('@/views/Movie/detail'),
      },
      props: {
        detail: true,
      },
    },
    {
      path: 'detail/2/:movieId',
      components: {
        default: () => import('@/components/ComingSoon'),
        detail: () => import('@/views/Movie/detail'),
      },
      props: {
        detail: true,
      },
    },
    {
      path: '/movie',
      redirect: '/movie/nowplaying',
    },
  ],
}
