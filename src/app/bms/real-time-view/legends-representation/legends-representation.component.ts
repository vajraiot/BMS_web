import { Component, OnInit } from '@angular/core';
import {CellLegends, CellLegendsColors} from '../../../enums';
@Component({
  selector: 'app-legends-representation',
  templateUrl: './legends-representation.component.html',
  styleUrls: ['./legends-representation.component.css']
})
export class LegendsRepresentationComponent implements OnInit {

  constructor()
     { }
    cellLegendsPics= CellLegends;
    gblCellLegendsColors= CellLegendsColors;
    
  ngOnInit(): void {
  }

}
