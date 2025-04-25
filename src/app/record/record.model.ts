export class Record{
    [key: string]: any
    id: number | null;
    moduleNr: string;
    moduleName: string;
    summer: boolean;
    year: number;
    crp: number;
    grade: number;
    halfWeight: boolean;
    

    
  
    constructor(id?: number | null, moduleNr?: string, moduleName?: string, crp?: number, grade?: number, weight?: boolean, summer?: boolean, year?: number) {
        this.id = id ?? null;
        this.moduleNr = moduleNr ?? '';
        this.moduleName = moduleName ?? '';
        this.crp = crp ?? 0;
        this.grade = grade ?? 0;
        this.halfWeight = weight ?? false;
        this.summer = summer ?? false;
        this.year = year ?? new Date().getFullYear();
    }

  }