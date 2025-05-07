import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonIcon, IonButton, IonButtons, IonFooter } from '@ionic/angular/standalone';
import { ModuleService } from '../module.service';
import { Module } from '../module.model';
import { ModalController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.page.html',
  styleUrls: ['./module-picker.page.scss'],
  standalone: true,
  imports: [IonFooter, IonButtons, IonButton, IonIcon, IonToolbar, IonItem, IonTitle, IonList, IonSearchbar, IonContent, IonHeader, CommonModule, FormsModule]
})
export class ModulePickerPage implements OnInit {

  modules: Module[] = []; 
  filteredModules: Module[] = []; 
  searchbarVisible = false; 
  searchText = "";
  #searchbar: IonSearchbar | undefined; 
  @ViewChild(IonSearchbar) 
  set searchbar(sb: IonSearchbar) { 
    if (sb) { 
      setTimeout(() => sb.setFocus(), 1)  
      this.#searchbar = sb; 
    } 
  } 

  constructor(private router: Router, public modalController: ModalController, private moduleService: ModuleService, private modalCtrl: ModalController) {
    this.modules = moduleService.findAll();
    this.filteredModules = this.modules;
    this.moduleService.load()

   }

   doSearch(){
    const term = this.searchText.toLowerCase().trim();
    if (!term) {
      this.filteredModules =  this.modules;
    }
    this.filteredModules = this.modules.filter(m =>
      m.name.toLowerCase().includes(term) ||
      m.nr.toLowerCase().includes(term)
    );
   }

   cancelSearch() {
    this.router.navigate(["/record-list"])
    this.modalCtrl.dismiss(null, 'cancel');
   }

   continueWithoutSearch(){
    this.modalCtrl.dismiss(null, "cancel");
   }

   openSearch() {
    this.searchbarVisible = true;
   }

   closeSearch(){
    this.searchbarVisible = false;
   }

  ngOnInit() {
  }

  

}
