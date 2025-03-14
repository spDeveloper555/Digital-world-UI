import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.css']
})
export class QrGeneratorComponent {
  public menuList: any = [
    { name: "Notifications", path: "notifications" },
    { name: "Profile", path: "profile"},
    { name: "Dashboard", path: "dashboard"}
  ]
  public qrForm:any = {
    allowImageDownload: false,
    duration: "",
  }

}
