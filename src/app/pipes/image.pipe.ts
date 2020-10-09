import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const api_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users' | 'hospitals' | 'doctors'): string {
    if(!img){
        return `${api_url}/upload/users/no-image`;
    } else if(img.includes('https')){
        return img;
    } else if(img){ 
        return `${api_url}/upload/${type}/${img}`; 
    } else{
        return `${api_url}/upload/users/no-image`;
    }  
  }

}
