import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-randing-temporarily',
  templateUrl: './randing-temporarily.component.html',
  styleUrls: ['./randing-temporarily.component.scss']
})
export class RandingTemporarilyComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  clickEl(event: any): void {
    console.log('click event ', event);
  }
}
