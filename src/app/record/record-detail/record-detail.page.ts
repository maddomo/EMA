import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonCheckbox, IonItem, IonBackButton, IonText, IonInput, NavController, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';
import { Record } from '../record.model';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, FormsModule, IonButton, IonButtons, IonIcon, IonItem, IonBackButton, IonText, IonInput, IonCheckbox, IonSelect, IonSelectOption]
})
export class RecordDetailPage implements OnInit {

  isEditMode = false;
  pageTitle: string;
  record = new Record();
  years: number[] = [];

  errors = new Map<string, string>();

  @ViewChild('moduleNr')
    private moduleNrRef: IonInput | undefined;


  constructor(private route: ActivatedRoute,
              private recordService: RecordService,
              private navCtrl: NavController) {

    const recordId = route.snapshot.paramMap.get("id");
    
    if(recordId){
      this.isEditMode = true;
      Object.assign(this.record, this.recordService.findById(parseInt(recordId, 10)));
      this.pageTitle = "Leistung bearbeiten"
      const loadedRecord = this.recordService.findById(parseInt(recordId, 10));
      console.log(loadedRecord);
    } else {
      this.pageTitle = "Leistung erstellen"
      this.record.year = new Date().getFullYear();
    }
    this.initYears();

  }

  ionViewDidEnter(){
    if(!this.isEditMode){
      this.moduleNrRef?.setFocus();
    }
  }

  ngOnInit() {
    
  }

  save(){
    this.errors.clear();
    
    if(!this.record.moduleNr){
      this.errors.set("moduleNr", "Modulnummer darf nicht leer sein!")
    }

    if(!this.record.moduleName){
      this.errors.set("moduleName", "Modulname darf nicht leer sein!")
    }

    if(!this.record.crp){
      this.errors.set("crp", "Creditpoints darf nicht leer sein!")
    }

    if(this.record.crp !== 3 && this.record.crp !== 6 && this.record.crp !== 9 ){
      this.errors.set("crp", "Bitte geben sie eine gültige Zahl für Creditpoints ein!")
    }

    if(!this.record.grade){
      this.errors.set("grade", "Note darf nicht leer sein!")
    }

    if(this.record.grade < 50 || this.record.grade > 100){
      this.errors.set("grade", "Geben sie eine gültige Zahl für Note ein!")
    }


    if(this.errors.size === 0){
      if(this.isEditMode){
        this.recordService.update(this.record);
      }else {
        this.recordService.persist(this.record);
      }
      this.navCtrl.pop();
    }
  }

  private initYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 5; year--) {
      this.years.push(year);
    }
  }

  deleteRecord(id: number){
    this.recordService.delete(id);
    this.navCtrl.pop();
  }

}
