import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnowledgeArticleComponent } from './knowledge-article.component';

const routes: Routes = [
    { path: 'knowledgeArticle', component: KnowledgeArticleComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KnowledgeArticleRoutingModule { }
