import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './common/components/no-content';
import { SectionComponent } from './targeted/components/section/section.component';
import { MainComponent } from './targeted/components/main/main.component';
import { DataResolver } from './app.resolver';
import { ArticleComponent } from './targeted/components/article/article.component';
import { TwitterComponent } from './common/components/twitter/twitter.component';
import { ArticlesListComponent } from './targeted/components/articles-list/artilcles-list.component';
import { FilterServiceComponent } from './targeted/components/filter-service/filter-service.component';


export const ROUTES: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'mainfiltered/:id', component: MainComponent },
  { path: 'article-list', component: ArticlesListComponent },
  { path: 'Section/:id', component: SectionComponent },
  { path: 'section/:id', component: SectionComponent },
  { path: 'Article/:id', component: ArticleComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'twitter', component: TwitterComponent },
  { path: 'filter', component: FilterServiceComponent },
  { path: '**', component: NoContent },

];

