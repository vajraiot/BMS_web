import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';
import { DialogData } from '../testing2/testing2.component';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TestingComponent>,
    @Inject(MAT_DIALOG_DATA) public serialNumber:number
  ) { }
gblValue:string='loading..';
public valueTesting(smthing:string)
{
  this.gblValue=smthing;
}
  ngOnInit(): void {
   
  }

}
