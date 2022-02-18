import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {ConsumoService} from '../../service/consumo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  correo = "";
  password = "";
  paswordEncriptado="";

  constructor(private consumir:ConsumoService , private router:Router) { }

  ngOnInit() {
    
  }

  convertirTexto() {
      if(this.correo == "" || this.password == ""){
        alert("El correo y contraseña son requeridos");
        return
      }
      
      this.consumir.findUserByCorreo(this.correo).subscribe(
       
        res=>{
          if(res !== undefined && res !== null){
            let bytes  = CryptoJS.AES.decrypt(res.password, 'secret key 123');
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            if(originalText == this.password){
              alert("login correcto:"+res.correo);
            }else{
              alert("error en datos de acceso");
            }
          }else{
            alert("error en datos de acceso");
          }
        },
        err=>console.log("error->",err)
      )
  }

}
