import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {
  @ViewChild('qrCanvas', { static: false }) qrCanvas!: ElementRef;
  @Input() qrData: string = 'Surya Prakash';
  qrSize: number = 300; 

  ngAfterViewInit() {
    this.generateQRCode();
  }

  generateQRCode() {
    if (!this.qrData) return;

    QRCode.toCanvas(this.qrCanvas.nativeElement, this.qrData, {
      width: this.qrSize,
      color: {
        dark: '#000000',
        light: '#ffffff' 
      },
      errorCorrectionLevel: 'M'
    }, (error:any) => {
      if (error) console.error('QR Code generation error:', error);
    });
  }

  downloadQRCode() {
    const canvas = this.qrCanvas.nativeElement as HTMLCanvasElement;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'digital-world-qr-code.png';
    link.click();
  }
}
