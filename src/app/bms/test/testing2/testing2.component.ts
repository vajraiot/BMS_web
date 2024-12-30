import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FieldNamesMapperService } from '../../../services';
import { TestingComponent } from '../testing/testing.component';

@Component({
  selector: 'app-testing2',
  templateUrl: './testing2.component.html',
  styleUrls: ['./testing2.component.css'],
})
export class Testing2Component implements OnInit {
  constructor(public dialog: MatDialog) {}
  fieldNamesMapperService=FieldNamesMapperService;

  //@Input('parentData1') dta1: string;
  //@Input('parentData2') dta2: string;

  ngOnInit(): void {
  
  }

  openDialog() {
    this.dialog.open(TestingComponent);
  }

  secondsTohhmmss(totalSeconds)
  {
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  
    // round seconds
    seconds = Math.round(seconds * 100) / 100
  
    let hr = (hours < 10 ? "0" + hours : hours);
    let mn =  (minutes < 10 ? "0" + minutes : minutes);
    let sc= (seconds  < 10 ? "0" + seconds : seconds);
    let totalTime= hr+':'+mn+':'+sc;
    return totalTime;
  }

  
}


@Component({
  selector: 'dialog-data-example-dialog',
  template: '<h3>Hello World</h3>'
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}



