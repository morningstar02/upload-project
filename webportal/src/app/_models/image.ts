import { SafeUrl } from '@angular/platform-browser';

export class Image {
    id: string;
    photoName: string;
    username: string;
    data: Blob;
    imageURL: SafeUrl;
    createdAt: string;
    updatedAt: string;
}