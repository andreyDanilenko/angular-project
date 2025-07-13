import { Routes } from '@angular/router';
import { DefaultLayout } from './layouts/ default-layout/default.layout';
import { HomePage } from './pages/home/home.page';
import { AboutPage } from './pages/about/about.page';
import { UserLayout } from './layouts/user-layout/user.layout';
import { ArticlePage } from './pages/article/article.page';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'about', component: AboutPage },
      { path: 'article', component: ArticlePage }
    ]
  },
  {
    path: '',
    component: UserLayout,
    children: [
      { path: 'user', component: HomePage },
    ]
  },
];
