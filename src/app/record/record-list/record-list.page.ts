import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController,IonSearchbar, IonAlert, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { Record } from '../record.model';
import { Statistic } from '../statistic.model';
import { Router } from '@angular/router';
import { RecordService } from '../record.service';
import {Share} from '@capacitor/share'

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonSearchbar, IonCardTitle, IonCardHeader, IonCard, IonAlert, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption]
})




export class RecordListPage implements OnInit {
  records: Record[] = []
  alertButtons = ["Schließen"]
  isEmpty: boolean = false;
  message = ""
  showSearchbar = true;
  searchText ="";

  #searchbar: IonSearchbar | undefined;
  @ViewChild(IonSearchbar)
  set searchbar(sb: IonSearchbar) { 
    if (sb) { 
      setTimeout(() => sb.setFocus(), 1)  
      this.#searchbar = sb; 
    } 
  } 
  
 

  constructor(private router: Router, private recordService: RecordService, private alertCtrl: AlertController) {}

  updateRecordList() {
    this.records = this.recordService.findAll();
    this.isEmpty = this.records.length === 0;
    this.showSearchbar = false;
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

  //records löschen
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

  //records teilen
  shareRecords() {
    let recordsMsg = ""

    for(let i = 0; i < this.records.length; i++){
      recordsMsg += this.records[i].moduleName + " " + this.records[i].grade + "%" + "\n"
    }


    let msgText = `Hallo, hier sind meine momentanen Leistungen: \n ${recordsMsg}`
    console.log(recordsMsg)
    Share.canShare().then(canShare => {
      if(canShare.value){
        Share.share({
          title: "Meine Studien Leistungen",
          text: msgText,
          dialogTitle: "Leistungen teilen"
        }).then((v) => console.log("ok:", v))
          .catch(err => console.log(err));
      }else {
        console.log("Error: Sharing not available!")
      }
    })
  }

  searchRecords() {
    this.showSearchbar = true;
  }

  onCancelSearch() {
    this.showSearchbar = false;
    this.searchText =""
  }
  //records suchen
  get filteredRecords(): Record[] {
     const term = this.searchText.toLowerCase().trim();
    if (!term) {
      return this.records;
    }
    return this.records.filter(record =>
      record.moduleName.toLowerCase().includes(term) ||
      record.moduleNr.toLowerCase().includes(term)
    );
  }
  

}
