import { Component, ViewChild, ElementRef } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webportal';
  user: User;
  event: MouseEvent;
  imageUploaded: Subject<string>;
  imgURL: any;
  public selectedFiles: FileList;
  @ViewChild('file') fileInput: ElementRef;
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.accountService.logout();
  }

  openFileSelectionDialog() {
    console.log('file selection dialog opened');
    this.event = new MouseEvent('click', {bubbles: false});
    this.fileInput.nativeElement.dispatchEvent(this.event);

  }

  selectFile(event: { target: { files: FileList; }; }) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length === 0) {
      return;
    }
    if (this.selectedFiles[0].type.match(/image\/*/) == null) {
      return;
    }

    //this.doUpload(this.selectedFiles[0]);
    const file = this.selectedFiles.item(0);
    console.log(file)
    let username = JSON.parse(localStorage.getItem('user')).username;
    console.log(username)
    this.accountService.uploadFile(file, file.name, username).subscribe(res => {
      console.log('got all', res);
    }, err => {
      console.log('err obtained');
    });
  }

  // doUpload(selectedFile: Blob | File) {
  //   this.imageUploaded = new Subject<string>();
  //   const reader = new FileReader();
  //   reader.readAsDataURL(selectedFile);
  //   reader.onload = (_event) => {
  //     this.imgURL = reader.result;
  //   };
  //   const that = this;
  //   reader.onloadend = (_event) => {
  //     const invokeData = setInterval(() => {
  //       clearInterval(invokeData);
  //       const file = this.selectedFiles.item(0);
  //     }, 100);
  //   };
  // }
}
