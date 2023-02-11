import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  sbjSpinner = new Subject<boolean>();
  sbjErrorsNotification = new Subject<string>();
  public isMobile = false

  constructor(private deviceService: DeviceDetectorService) { 
    this.isMobile = this.deviceService.isMobile();
  }
}
