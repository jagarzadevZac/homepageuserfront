import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConsumoService {

  private readonly URI = 'https://apiban.herokuapp.com/user/';
  constructor(private httpClient: HttpClient) { }

  login(user:userInterface){
    return this.httpClient.post<userInterface>(this.URI+'login',user);
  }

  findUserByCorreo(correo:String){
    return this.httpClient.get<userInterface>(this.URI+'find/'+correo);
  }
}

export interface userInterface{
  correo: String;
  password: String;
}
