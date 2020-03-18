import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import {AuthenticationDetails,CognitoUser,CognitoUserPool} from 'amazon-cognito-identity-js';
//import * as AWS from 'aws-sdk';

//import 'rxjs/add/operator/map';




@Injectable({
  providedIn: 'root'
})
export class EnergyService {
 gerUrl:string = " https://8wwv5yrsu0.execute-api.us-east-1.amazonaws.com/prod";
  private url:string = "http://localhost:5000";
  getResult:any={};


  constructor(private http:HttpClient) {
   
   }


  


  get(){
    return this.http.get(this.url);
  }
  doget(start)
  {
    let params=new HttpParams().set("buttonState",start);
    this.http.get(this.gerUrl,{params}).subscribe (
      res=>{this.getResult=res},
      err=>{console.log("error ocuurred" +err.message)}
    )
  }






}
