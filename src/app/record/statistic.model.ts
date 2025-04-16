import { Record } from "./record.model";

export class Statistic{
    recordCount: number;
    hwCount: number;
    sumCrp: number;
    crpToEnd: number;
    averageGrade: number;
    private reslut50: Record[];

    constructor(records: Record[]){
        this.reslut50 = records.filter(record => record.halfWeight);
        this.recordCount = records.length;
        this.hwCount = this.reslut50.length;
        this.sumCrp = records.map(record => record.crp).reduce((sum, crp) => sum += crp, 0);
        this.crpToEnd = 180 - this.sumCrp;
        this.averageGrade = this.helperAvgGrade(records);
      

    }

    // durchSchnitt = sum(crp * note) / realCrp
    helperAvgGrade = (records: Record[]) => {

        //sum(crp * note) berechnen
        let firstSum = 0;
        if(records.length === 0) return 0;
        for(let i = 0; i < records.length; i++){
            if(records[i].halfWeight === true){
                firstSum += (records[i].crp / 2) * records[i].grade;
            }else{
                firstSum += records[i].crp * records[i].grade;
            }
            
        }

        //"realCrp" berechnen
        let realCrp = 0
        for(let i = 0; i < records.length; i++){
            if(records[i].halfWeight === true){
                realCrp += (records[i].crp / 2);
            }else{
                realCrp += records[i].crp;
            }
        }
        console.log(realCrp);

        return Math.floor(firstSum / realCrp);
    }


    toString():string {
        return `Anzahl der erfassten leistungen: ${this.recordCount}\n
        Anzahl der erfassten halbgewichteten Leistungen ${this.hwCount}\n
        Summe der Credit Points: ${this.sumCrp}\n
        Credit Points bis zum Abschluss: ${this.crpToEnd}\n
        Durchschnittsnote: ${this.averageGrade}`
    }

}