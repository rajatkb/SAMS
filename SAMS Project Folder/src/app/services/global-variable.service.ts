import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVariableService {

  constructor() { }

  API_BASE_URL:string = "http://127.0.0.1:8008/";

}
