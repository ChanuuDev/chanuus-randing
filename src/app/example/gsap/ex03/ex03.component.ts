import {AfterViewInit, Component, OnInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'app-ex03',
  templateUrl: './ex03.component.html',
  styleUrls: ['./ex03.component.scss']
})
export class Ex03Component implements OnInit, AfterViewInit {

  scrollPositionX = 0;
  scrollPositionY = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
