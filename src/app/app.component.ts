import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons'; 
import {add, statsChartOutline, trash, share, search} from 'ionicons/icons'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({add, statsChartOutline, trash, share, search});
  }

  
}
