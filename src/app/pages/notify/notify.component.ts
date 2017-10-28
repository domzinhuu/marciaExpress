import { LoadingService } from './../../shared/loading/loading.service';
import { NotifyContainer } from './../../models/notify.model';
import { NotifyService } from './../../providers/notify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'me-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  notifyContainer: NotifyContainer

  constructor(private notifyService: NotifyService,private loadingService:LoadingService) { }

  ngOnInit() {
    this.loadingService.show()
    this.notifyService.getNotifies(20).subscribe(notifies => {
      this.notifyContainer = notifies
      this.loadingService.hide()
    })
  }

  changeNotifyStatus(id: string) {
    this.notifyService.markNotify(id).subscribe(success => {
      this.notifyService.getNotifies(20).subscribe(notifies => {
        this.notifyContainer = notifies
        this.notifyService.notifiesObserver.next()
      })
    })
  }

  changeAllToRead() {
    this.notifyService.markAllNotify().subscribe(success => {
      this.notifyService.getNotifies(20).subscribe(notifies => {
        this.notifyContainer = notifies
        this.notifyService.notifiesObserver.next()
      })
    })
  }

}
