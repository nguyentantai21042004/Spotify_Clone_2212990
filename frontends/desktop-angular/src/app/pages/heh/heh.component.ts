import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-heh',
  templateUrl: './heh.component.html',
  styleUrls: ['./heh.component.scss']
})

export class HehComponent implements OnInit {
  private startX: number = 0;
  private startWidthLeft: number = 0;
  private startWidthMain: number = 0;
  private startWidthRight: number = 0;
  private isResizingLeft: boolean = false;
  private isResizingRight: boolean = false;

  ngOnInit() {
    const resizerLeft = document.getElementById('resizer');
    const resizerRight = document.getElementById('resizer-right');

    if (resizerLeft && resizerRight) {
      resizerLeft.addEventListener('mousedown', this.onMouseDownLeft.bind(this));
      resizerRight.addEventListener('mousedown', this.onMouseDownRight.bind(this));
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isResizingLeft) {
      this.resizeLeft(event);
    } else if (this.isResizingRight) {
      this.resizeRight(event);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isResizingLeft = false;
    this.isResizingRight = false;
  }

  onMouseDownLeft(event: MouseEvent) {
    this.isResizingLeft = true;
    this.startX = event.clientX;

    const leftPanel = document.getElementById('left-panel');
    const mainPanel = document.getElementById('main-panel');

    if (leftPanel && mainPanel) {
      this.startWidthLeft = leftPanel.offsetWidth;
      this.startWidthMain = mainPanel.offsetWidth;
    }

    event.preventDefault();
  }

  onMouseDownRight(event: MouseEvent) {
    this.isResizingRight = true;
    this.startX = event.clientX;

    const rightPanel = document.getElementById('right-panel');
    const mainPanel = document.getElementById('main-panel');

    if (rightPanel && mainPanel) {
      this.startWidthRight = rightPanel.offsetWidth;
      this.startWidthMain = mainPanel.offsetWidth;
    }

    event.preventDefault();
  }

  resizeLeft(event: MouseEvent) {
    const dx = event.clientX - this.startX;
    const leftPanel = document.getElementById('left-panel');
    const mainPanel = document.getElementById('main-panel');

    if (leftPanel && mainPanel) {
      leftPanel.style.width = `${this.startWidthLeft + dx}px`;
      mainPanel.style.width = `${this.startWidthMain - dx}px`;
    }
  }

  resizeRight(event: MouseEvent) {
    const dx = event.clientX - this.startX;
    const mainPanel = document.getElementById('main-panel');
    const rightPanel = document.getElementById('right-panel');

    if (mainPanel && rightPanel) {
      mainPanel.style.width = `${this.startWidthMain + dx}px`;
      rightPanel.style.width = `${this.startWidthRight - dx}px`;
    }
  }

}
