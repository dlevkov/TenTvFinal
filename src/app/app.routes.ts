import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './common/components/no-content';
import { SectionComponent } from './targeted/components/section/section.component';
import { MainComponent } from './targeted/components/main/main.component';
import { DataResolver } from './app.resolver';
import { ArticleComponent } from './targeted/components/article/article.component';
import { TwitterComponent } from './common/components/twitter/twitter.component';
import { ArticlesListComponent } from './targeted/components/articles-list/artilcles-list.component';
import { PreFilterMessage } from './targeted/components/filter-service/pre-filter-message.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'mainfiltered/:id', component: MainComponent },
  { path: 'mainfiltered', redirectTo: '/main', pathMatch: 'full' },
  { path: 'article-list', component: ArticlesListComponent },
  { path: 'Section/:id', component: SectionComponent },
  { path: 'section/:id', component: SectionComponent },
  { path: 'Article/:id', component: ArticleComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'twitter', component: TwitterComponent },
  { path: 'filter', component: PreFilterMessage },
  { path: '**', component: NoContent },

];

