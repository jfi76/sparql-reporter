import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { ConnectionComponent } from '../ui/connection';
import { ExplorerComponent } from '../ui/explorer';

@NgModule({
imports:[
    RouterModule.forRoot([
        {path:'',
         pathMatch:'full',
         redirectTo: 'explorer'
        },
        {path:'explorer',
         pathMatch:'full',
         component: ExplorerComponent
        },

        {path:'connection',
         pathMatch:'full',
         component: ConnectionComponent
        }

    ])
],
exports:[RouterModule]
})
export class AppRoutingModule{
    
}

