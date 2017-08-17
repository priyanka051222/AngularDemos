import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SharedModule } from './shared/shared.module'; 
import { MessageService } from '../components/messages/message.service';
import { MessageComponent } from '../components/messages/message.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: 'messages',
                component: MessageComponent ,
                outlet: 'popup'
            }
        ])
    ],
    declarations: [
        MessageComponent
    ],
    providers: [
        MessageService
    ]
})
export class MessageModule { }
