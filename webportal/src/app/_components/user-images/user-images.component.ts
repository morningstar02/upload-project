import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User, Image } from '../../_models'
import { AccountService, AlertService } from '../../_services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-images',
  templateUrl: './user-images.component.html',
  styleUrls: ['./user-images.component.scss']
})
export class UserImagesComponent implements OnInit {

  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  public images : Image[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.accountService.getImagesById(this.id)
        .subscribe(res => {
            this.images = <Image[]> <unknown>res;
            console.log(this.images);
            this.images.forEach(element => {
                let TYPED_ARRAY = new Uint8Array(element.data['data']);
                const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
                    return data + String.fromCharCode(byte);
                }, '');
                let base64String = btoa(STRING_CHAR);

                element.imageURL = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
                console.log(element.imageURL);
            });  
        });

  }

}