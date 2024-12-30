import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing3',
  templateUrl: './testing3.component.html',
  styleUrls: ['./testing3.component.css']
})
export class Testing3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const $button  = document.querySelector('#sidebar-toggle');
const $wrapper = document.querySelector('#wrapper');

$button.addEventListener('click', (e) => {
  e.preventDefault();
  $wrapper.classList.toggle('toggled');
});
  }

}
