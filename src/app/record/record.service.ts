import { Injectable } from '@angular/core';
import { Record } from './record.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private records: Record[];
  private nextId: number;

  constructor() { 
    const recordsJSON: string | null = localStorage.getItem("records");
    if(recordsJSON){
      this.records = JSON.parse(recordsJSON);
      this.nextId = parseInt(localStorage.getItem("nextId") ?? "1", 10)
    }else{
      this.records = [];
      this.nextId = 1;
      if(!environment.production){
        //this.insertTestData();
      }
    }
  }


  private saveRecords(): void {
    localStorage.setItem("records", JSON.stringify(this.records))
    localStorage.setItem("nextId", this.nextId.toString());
  }

  findAll(): Record[] {
    return this.records;
  }

  findById(id: number): Record | undefined {
    return this.records.find(r => r.id === id)
  }

  persist(record: Record): void{
    record.id= this.nextId++;
    this.records.push(record)
    this.saveRecords()
  }

  update(record: Record): boolean{
    const index = this.records.findIndex(r => r.id === record.id)
    if(index !== -1){
      this.records[index] = record;
      this.saveRecords()
      return true;
    }
    return false
  }
  delete(id: number): boolean {
    const index = this.records.findIndex(r => r.id === id);
    if (index !== -1) {
      this.records.splice(index, 1);
      this.saveRecords();
      return true;
    }
    return false;
  }
}
