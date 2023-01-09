import { Component, OnInit } from '@angular/core';
import * as Matter from 'matter-js';

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit {

  Engine = Matter.Engine;
  Render = Matter.Render;
  World = Matter.World;
  Bodies = Matter.Bodies;

  constructor() { }

  ngOnInit(): void {
    const wrapper: any = <HTMLElement>document.getElementById('matter-wrap');
    const engine = this.Engine.create();

    const render = this.Render.create({
      element: wrapper,
      engine: engine,
      options: {
        width: 800,
        height: 400,
        wireframes: false
      }
    });

    const boxA = this.Bodies.rectangle(400, 200, 80, 80);
    const ballA = this.Bodies.circle(380, 100, 40);
    const ballB = this.Bodies.circle(0, 10, 40);
    const trace = this.Bodies.rectangle(120, 220, 500, 60, { isStatic: true })
    Matter.Body.setAngle(trace, .5);
    Matter.Body.setMass(ballB, 50);

    const ground = this.Bodies.rectangle(400, 380, 810, 60, { isStatic: true });

    this.World.add(engine.world, [boxA, ballA, ballB, ground, trace]);
    this.Engine.run(engine);
    this.Render.run(render);

  }

}
