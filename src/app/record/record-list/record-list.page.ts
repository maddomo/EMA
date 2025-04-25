import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonList, IonItem } from '@ionic/angular/standalone';
import { Record } from '../record.model';
import { Statistic } from '../statistic.model';
import { Router } from '@angular/router';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonList, IonItem]
})




export class RecordListPage implements OnInit {
  records: Record[] = []

  constructor(private router: Router, private recordService: RecordService) { 
    this.records = recordService.findAll();
  }

  createRecord(): void {
    this.router.navigate(["record-detail"])
  }

  editRecord(record: { id: any; }){
    this.router.navigate(["record-detail", {id: record.id}])
  }

  showStats(): void {
    const stats: Statistic = new Statistic(this.records)
    console.log(stats.toString())
  }

  ngOnInit() {
  }

  

}
