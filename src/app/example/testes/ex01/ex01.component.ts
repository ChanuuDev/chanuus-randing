import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss']
})
export class Ex01Component implements OnInit, AfterViewInit {

  // 유저
  user: any = {};

  // 룰렛 칸
  options = [
    '꽝', '꽝', '당첨', '꽝', '꽝',
    '당첨', '꽝', '꽝', '당첨', '꽝'
  ];

  // 룰렛 컬러 (커스텀하고자 하는 경우 룰렛 칸 만큼 색 지정)
  colorOptions: string[] = [
    '#eee', '#eee', '#fff', '#eee', '#eee',
    '#fff', '#eee', '#eee', '#fff', '#eee',
  ];

  rouletteSize: any = {
    outsideRadius: 200,
    textRadius: 130,
    insideRadius: 80,
    regular: 200,
  };

  startAngle = 0;
  arc = Math.PI / (this.options.length / 2);
  spinTimeout: any = null;
  spinAngleStart = 10;
  spinTime = 0;
  spinTimeTotal = 0;

  ctx: any;

  width = 300;
  height = 300;

  gameProgress: any = false;

  constructor(
    private router: Router,
  ) {
    console.log('localStorage user : ', this.user);
  }

  ngOnInit(): void {
    this.width = this.getInnerWidth(50);
    this.height = this.getInnerWidth(50);
    this.initRouletteWheelSize(this.getInnerWidth(50));
  }

  ngAfterViewInit(): void {
    this.playRoulette();
  }

  byte2Hex(n: number): string {
    const nybHexString = '0123456789ABCDEF';
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

  RGB2Color(r: number, g: number, b: number): string {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item: any, maxitem: any): string {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = Math.PI * 2 / maxitem;

    const red   = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue  = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }

  getCustomColor(index: number): string {
    return this.colorOptions[index];
  }

  initRouletteWheelSize(criteriaSize: number): void {
    this.rouletteSize.outsideRadius = (criteriaSize / 2) - 10;
    this.rouletteSize.textRadius = criteriaSize / 3;
    this.rouletteSize.insideRadius = criteriaSize / 4.5;
    this.rouletteSize.regular = criteriaSize / 2;
  }

  drawRouletteWheel(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (canvas.getContext) {
      const outsideRadius = this.rouletteSize.outsideRadius;
      const textRadius = this.rouletteSize.textRadius;
      const insideRadius = this.rouletteSize.insideRadius;

      this.ctx = canvas.getContext('2d');
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.ctx.strokeStyle = '#ddd';
      this.ctx.lineWidth = 3;
      this.ctx.font = 'bold 15px';

      for (let i = 0; i < this.options.length; i++) {
        const angle = this.startAngle + i * this.arc;

        // 룰렛 칸 색
        // this.ctx.fillStyle = this.getColor(i, this.options.length);

        this.ctx.fillStyle = this.getCustomColor(i); // 직접 지정하고 싶은 경우

        this.ctx.beginPath();
        this.ctx.arc(this.rouletteSize.regular, this.rouletteSize.regular, outsideRadius, angle, angle + this.arc, false);
        this.ctx.arc(this.rouletteSize.regular, this.rouletteSize.regular, insideRadius, angle + this.arc, angle, true);

        this.ctx.arc(this.rouletteSize.regular, this.rouletteSize.regular, outsideRadius, angle, angle + this.arc, false);
        this.ctx.arc(this.rouletteSize.regular, this.rouletteSize.regular, insideRadius, angle + this.arc, angle, true);

        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.save();

        // 안쪽 폰트 관련
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = -1;
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = 'black';
        this.ctx.font = 'bold 15px Helvetica, Arial';
        this.ctx.translate(this.rouletteSize.regular + Math.cos(angle + this.arc / 2) * textRadius,
          this.rouletteSize.regular + Math.sin(angle + this.arc / 2) * textRadius);
        this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
        const text = this.options[i];
        this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
        this.ctx.restore();
      }

      // 화살표
      this.ctx.fillStyle = '#FB7A8E';
      this.ctx.beginPath();
      this.ctx.moveTo(this.rouletteSize.regular - 4, this.rouletteSize.regular - (outsideRadius + 5));
      this.ctx.lineTo(this.rouletteSize.regular + 4, this.rouletteSize.regular - (outsideRadius + 5));
      this.ctx.lineTo(this.rouletteSize.regular + 4, this.rouletteSize.regular - (outsideRadius - 5));
      this.ctx.lineTo(this.rouletteSize.regular + 9, this.rouletteSize.regular - (outsideRadius - 5));
      this.ctx.lineTo(this.rouletteSize.regular + 0, this.rouletteSize.regular - (outsideRadius - 13));
      this.ctx.lineTo(this.rouletteSize.regular - 9, this.rouletteSize.regular - (outsideRadius - 5));
      this.ctx.lineTo(this.rouletteSize.regular - 4, this.rouletteSize.regular - (outsideRadius - 5));
      this.ctx.lineTo(this.rouletteSize.regular - 4, this.rouletteSize.regular - (outsideRadius + 5));
      this.ctx.fill();
    }
  }

  easeOut(t: number, b: number, c: number, d: number): number {
    const ts = ( t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  spin(): void {
    this.gameProgress = true;
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1500;
    this.rotateWheel();
  }

  rotateWheel(): void {
    this.spinTime += 30;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    const spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += (spinAngle * Math.PI / 180);
    this.drawRouletteWheel();
    this.spinTimeout = setTimeout(() => {
      this.rotateWheel();
    }, 30);
  }

  stopRotateWheel(): void {
    clearTimeout(this.spinTimeout);
    const degrees = this.startAngle * 180 / Math.PI + 90;
    const arcd = this.arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    this.ctx.save();

    // 안쪽 결과 폰트
    this.ctx.font = 'bold 30px Helvetica, Arial';
    const text = this.options[index];
    this.ctx.fillText(text, this.rouletteSize.regular - this.ctx.measureText(text).width / 2, this.rouletteSize.regular + 10);
    this.ctx.restore();

    this.roulettePlayUserSave(text);
  }

  getInnerHeight(): number {
    return window.innerHeight;
  }

  getInnerWidth(minus: number): number {
    return window.innerWidth - minus;
  }

  playRoulette(): void {
    this.drawRouletteWheel();
    this.spin();
  }

  roulettePlayUserSave(winYn: string): void {
  }

}
