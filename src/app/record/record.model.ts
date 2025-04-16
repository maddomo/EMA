export class Record{
    id: number;
    moduleNr: string;
    moduleName: string;
    summer: boolean;
    year: number;
    crp: number;
    grade: number;
    halfWeight: boolean;
  
    constructor(id: number, moduleNr: string, moduleName: string, crp: number, grade: number, weight: boolean, summer: boolean, year: number){
      this.id = id;
      this.moduleNr = moduleNr;

      this.moduleName = moduleName;
      this.summer = summer;
      this.year = year;
      this.crp = crp;
      this.grade = grade;
      this.halfWeight = weight;
    }
  }