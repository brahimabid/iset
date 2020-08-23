import { Injectable } from '@angular/core';
import {Http, RequestOptions,Headers} from '@angular/http'
import 'rxjs/add/operator/map'
import {JwtHelper, tokenNotExpired} from 'angular2-jwt'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper=new JwtHelper();

  decoded;
  constructor(private router:Router,private http:Http) { }

 auth(user){
    return this.http.post('http://localhost:3000/user/auth',user).map(res=>{
      return res.json()
    })
  }
  islogged(){
  
    let token=localStorage.getItem('x-token');
    console.log(tokenNotExpired(token))
    if(!token)
    return false;
    
    let expirationdate=this.jwtHelper.getTokenExpirationDate(token);
    let isExpiredToken=this.jwtHelper.isTokenExpired(token)
       console.log("date"+ expirationdate);
       console.log("isexpired"+ isExpiredToken);
       return !isExpiredToken;
  }
  
  currentUser(){
        let token=localStorage.getItem('x-token');
        
        //if(!token) {this.router.navigate([''])}
        
         return this.decoded=this.jwtHelper.decodeToken(token);
        
  
  }
  
  logOut(){
    localStorage.removeItem('x-token');
    this.router.navigate(['auth/login']);
  }
   
  optionHeader() : RequestOptions{
    let token=localStorage.getItem('x-token');
    let headers=new Headers();
    headers.append('x-token',token);
    let options=new RequestOptions({ headers :headers});
    return options
  }

}
