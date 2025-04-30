import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonAlert, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Record } from '../record.model';
import { Statistic } from '../statistic.model';
import { Router } from '@angular/router';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonAlert, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption]
})




export class RecordListPage implements OnInit {
  records: Record[] = []
  alertButtons = ["Schließen"]
  isEmpty: boolean = false;
  message = ""

  constructor(private router: Router, private recordService: RecordService, private alertCtrl: AlertController) {}

  updateRecordList() {
    this.records = this.recordService.findAll();
    this.isEmpty = this.records.length === 0;
  }

  createRecord(): void {
    this.router.navigate(["record-detail"])
  }

  editRecord(record: { id: any; }){
    this.router.navigate(["record-detail", {id: record.id}])
  }

  ngOnInit() {
    this.updateRecordList();
  }

  ionViewWillEnter() {
    this.updateRecordList();
  }

  showStats(){
    const stats: Statistic = new Statistic(this.records)
    this.message = stats.toString()
  }

  async deleteRecord(id: number | null, slidingItem: IonItemSliding){
    const alert = await this.alertCtrl.create({
      header: "Wollen Sie das Record wirklich löschen?",
      message: "",
      buttons: [
        {
          text: "Abbrechen",
          role: "cancel",
          handler: () => {
            slidingItem.close()
          }
        },
        {
          text: "Löschen",
          role: "destructive",
          handler: () => {
            this.recordService.delete(id ?? -1)
            slidingItem.close()
            this.updateRecordList();
          }
        }
      ]
    })
    await alert.present();
  }


  

}
