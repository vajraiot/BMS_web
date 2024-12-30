import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tesing5',
  templateUrl: './tesing5.component.html',
  styleUrls: ['./tesing5.component.css']
})
export class Tesing5Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tst1='test1';
  tst2='test2';

  getClick()
  {
    this.tst2='d2';
    this.tst1='d1';
  }
}
