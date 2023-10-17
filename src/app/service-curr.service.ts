import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceCurrService {

 

  apiUrl = 'http://api.nbp.pl/api/exchangerates/tables/a/?format=json';
  apiUrlGold = 'http://api.nbp.pl/api/cenyzlota/2019-08-08/2019-09-07/';
  //http://api.nbp.pl/api/exchangerates/rates/a/gbp/2012-01-01/2012-01-31/

  time = new Date();
  ear30 = new Date(this.time.getTime() - 60 * 24 * 60 * 60 * 1000);

  constructor(private http: HttpClient) { }

  getCurrencyTab(): Observable<any> {
    console.log("get currenty tab")
    return this.http.get(this.apiUrl);
  }

  getCurrencyOne(): Observable<any> {

    return this.http.get('http://api.nbp.pl/api/exchangerates/rates/a/dkk/2019-06-08/2019-09-07/');
  }

  getCurrencyOne1(code: string): Observable<any> {
    //let code="eur";
    return this.http.get('http://api.nbp.pl/api/exchangerates/rates/a/' + code + '/' + this.timestring(this.ear30) + '/' + this.timestring(this.time) + '/');
  }

  getCurrencyOne2(code: string) {
    let arrTest = []
    for (let i = 0; i <= 45; i++) {
      let value = 0
      if (code == "CHF" || code == "USD" || code == "EUR") {
        value = 4
      }
      if (code == "GBP" || code == "INR" || code == "XDR" ) {
        value = 5
      }
      if (code == "SGD" || code == "ISK" || code == "EUR") {
        value = 5
      }
      let rnd = Math.random()
      let value2 = value + rnd
      arrTest[i]=Number(value2.toFixed(4))
      // console.log("service ", i, code, arrTest[i])
    }
    return arrTest
  }



  getGold(): Observable<any> {
    return this.http.get('http://api.nbp.pl/api/cenyzlota/' + this.timestring(this.ear30) + '/' + this.timestring(this.time) + '/');
  }

  timestring(date: Date) {
    let h = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let y = date.getFullYear();
    let datestr = y + '-' + m + '-' + h;
    return datestr;
  }



  test1(): Observable<any> {
    return this.http.get('http://localhost:9003/api/todoapp/GetNotes');
  }


  test2(formData:any): Observable<any> {
    return this.http.put('http://localhost:9003/api/todoapp/UpdateNumber',formData);

  }











}
