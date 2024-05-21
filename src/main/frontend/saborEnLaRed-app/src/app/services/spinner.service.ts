import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
 isLoadding = signal<boolean>(false)

  constructor() { }

  public hide(){
    this.isLoadding.set(false);
  }


  public show(){
    this.isLoadding.set(true);
  }
}
