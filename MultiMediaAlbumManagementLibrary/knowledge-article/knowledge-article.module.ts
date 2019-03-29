import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KnowledgeArticleComponent } from './knowledge-article.component';
import { KnowledgeArticleRoutingModule } from './knowledge-article.routing';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
    imports:
        [CommonModule,
            FormsModule,
            NgbModule.forRoot(),
            KnowledgeArticleRoutingModule,
            AngularMultiSelectModule
        ],
    declarations: [KnowledgeArticleComponent]
})
export class KnowledgeArticleModule { }
