import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonList, IonItem } from '@ionic/angular/standalone';
import { Record } from '../record.model';
import { Statistic } from '../statistic.model';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonList, IonItem]
})




export class RecordListPage implements OnInit {
  records: Record[] = []

  constructor() { 
    this.records.push(
      new Record(1, 'CS1019', 'Compilerbau', 6, 78, false, true, 2010), 
      new Record(2, 'CS1022', 'Betriebssysteme', 6, 71, false, false, 2009), 
      new Record(3, 'CS4711', 'OOP', 6, 81, false, false, 2011) 
    )
  }

  createRecord(): void {
    console.log("Not implement yet!")
  }

  showStats(): void {
    const stats: Statistic = new Statistic(this.records)
    console.log(`Anzahl Kurse: ${stats.recordCount}\n Anzahl der halbgewichteten Kurse: ${stats.hwCount}`)
  }

  ngOnInit() {
  }

  

}
