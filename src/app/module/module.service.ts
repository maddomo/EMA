import { Injectable } from '@angular/core';
import { Module } from './module.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  static CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  static MODULES_URL = ModuleService.CORS_PROXY + 'https://ema-thm.github.io/modules.json';
  modules: Module[];
  private static FetchIntervall = 24 * 60 *60*1000;

  constructor(private http: HttpClient) {
    const modulesJSON = localStorage.getItem("modules");

    if(modulesJSON){
      this.modules = JSON.parse(modulesJSON);
    }else{
      this.modules = [];
      this.modules.push(new Module("CS1019", "Compilerbau", 6));

      this.save();
    }
   }

   findAll(): Module[]{
    return this.modules;
   }

   private save():void {
    localStorage.setItem("modules", JSON.stringify(this.modules))
   }

   load() {
    const modulesLastModified: string | null = localStorage.getItem("modulesLastModified");
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const now = Date.now();

    if(lastFetchTime && now - parseInt(lastFetchTime, 10) < ModuleService.FetchIntervall){
      console.log("Jumping fetch: Last fetchtime was less then 24 hours");
      return;
    }

    this.http.get<Module[]>(ModuleService.MODULES_URL, {
      observe: "response",
      headers: modulesLastModified ? {"If-Modified-Since": modulesLastModified} : {}
    }).subscribe({
      next: (response: HttpResponse<Module[]>) => {

        const newModules = response.body ?? [];
        this.modules.splice(0, this.modules.length, ...newModules);

        localStorage.setItem(
          "modulesLastModified",
          response.headers.get("Last-Modified") ?? ""
        )

        localStorage.setItem("lastFetchTime", now.toString());
        
        this.save();
      },
      error: (e: HttpErrorResponse) => {

      }
    });
   }
}
