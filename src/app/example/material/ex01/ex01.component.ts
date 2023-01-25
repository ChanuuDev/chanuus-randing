import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Ex01ChildComponent} from './ex01-child/ex01-child.component';


@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit, OnChanges {

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  count = 0;

  @ViewChild('countingBox') countingBox: Ex01ChildComponent | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes : ', changes);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('drop event : ', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  add(): void {
    this.count++;
  }

  minus(): void {
    this.count--;
  }

}
