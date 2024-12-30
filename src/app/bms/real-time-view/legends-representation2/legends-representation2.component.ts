import { Component, OnInit } from '@angular/core';
import { CellLegends, CellLegendsColors } from 'src/app/enums';

@Component({
  selector: 'app-legends-representation2',
  templateUrl: './legends-representation2.component.html',
  styleUrls: ['./legends-representation2.component.css']
})
export class LegendsRepresentation2Component implements OnInit {

  constructor() { }

  cellLegendsPics= CellLegends;
  gblCellLegendsColors= CellLegendsColors;
  
  ngOnInit(): void {
  }

}
