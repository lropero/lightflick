import { Movies } from 'lightflick/components'

const routes = [
  {
    path: '/',
    redirect: '/movies'
  },
  {
    path: '/movies',
    component: Movies
  },
  {
    path: '/movies/:id',
    component: Movies
  }
]

export default routes
