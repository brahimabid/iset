import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  message=""
  submitted=false
  constructor(private serv: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    })
  }

  get f() { return this.formLogin.controls }


  login() {
this.submitted=true
    if (this.formLogin.valid) {
      this.serv.auth(this.formLogin.value).subscribe(res => {
        console.log(res)
        if (res.status) {
          localStorage.setItem('x-token',res.resultat)
          let decoded = this.serv.currentUser()
          localStorage.setItem('nom',decoded.nom)
          localStorage.setItem('id',decoded._id)

          console.log(decoded)
          if (decoded.role == 1) {
            this.router.navigate(['/prof'])
          }
          if (decoded.role == 0) {
            this.router.navigate(['/agent'])
          }
          if (decoded.role == 2) {
            this.router.navigate(['/responsable'])
          }
        }else this.message=res.resultat
      })
    } else alert("remplir les champs")
  }
}
