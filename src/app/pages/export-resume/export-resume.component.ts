import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../providers/register.service';
import { MONTHS } from '../../utils/variables.utils';

@Component({
  selector: 'me-export-resume',
  templateUrl: './export-resume.component.html',
  styleUrls: ['./export-resume.component.css']
})
export class ExportResumeComponent implements OnInit {
  month: string;
  year: number;
  resumeData: any;
  notIncludeCard = false;

  constructor(private registerService: RegisterService) {}

  ngOnInit() {
    this.month = MONTHS[new Date().getMonth()];
    this.year = new Date().getFullYear();
  }

  setPeriod(period: any) {
    this.month = period.month;
    this.year = period.year;
  }

  changeCheckbox(): void {
    this.notIncludeCard = !this.notIncludeCard;
  }
  doSearch() {
    console.log(this.notIncludeCard);
    this.registerService.getResume(this.month, this.year, null, this.notIncludeCard).then(result => {
      this.resumeData = result;
    });
  }
}
