import { Observable } from 'rxjs/Observable';
import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Country } from '../models/country.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'api/users';  // URL to web api
  private countriesUrl = 'api/countries';  // URL to web api
  
  /**
   * Creates an instance of UserService.
   * @param {Http} http 
   * @memberof UserService
   */
  constructor(private http: Http) { }


  /**
   * 
   * 
   * @returns {Promise<User[]>} 
   * @memberof UserService
   */
  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
               .toPromise()
               .then(response => response.json().data as User[])
               .catch(this.handleError);
  } 

  initializeUser(): User {
    // Return an initialized object
    return new User();
}
  /**
   * 
   * 
   * @param {string} country 
   * @param {string} state 
   * @returns {Promise<User[]>} 
   * @memberof UserService
   */
  getUsersByCountryAndState(country:string , state:string): Promise<User[]> {
    const url = `${this.usersUrl}?country=${country}&state=${state}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as User[])
               .catch(this.handleError);
  } 

  /**
   * 
   * 
   * @returns {Promise<Country[]>} 
   * @memberof UserService
   */
  getCountries(): Promise<Country[]> {
    return this.http.get(this.countriesUrl)
               .toPromise()
               .then(response => response.json().data as Country[])
               .catch(this.handleError);
  }

 
  /**
   * 
   * 
   * @param {number} id 
   * @returns {Promise<User>} 
   * @memberof UserService
   */
  getUser(id: number): Promise<User> {
    if (id == 0) {
      return Promise.resolve(this.initializeUser());
    };
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as User)
      .catch(this.handleError);
  }

  /**
   * 
   * 
   * @param {string} id 
   * @returns {Promise<Country>} 
   * @memberof UserService
   */
  getCountry(id:string): Promise<Country> {
    const url = `${this.countriesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Country)
      .catch(this.handleError);
  }

  /**
   * 
   * 
   * @param {number} id 
   * @returns {Promise<void>} 
   * @memberof UserService
   */
  delete(id: number): Promise<void> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  /**
   * 
   * 
   * @param {User} user 
   * @returns {Promise<User>} 
   * @memberof UserService
   */
  create(user:User): Promise<User> {
    return this.http
      .post(this.usersUrl, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }


  /**
   * 
   * 
   * @param {User} user 
   * @returns {Promise<User>} 
   * @memberof UserService
   */
  update(user: User): Promise<User> {
    const url = `${this.usersUrl}/${user.id}`;
    if(user.id == 0){
      this.create(user);
    }
    else{
      return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
    }
  }

  /**
   * 
   * 
   * @private
   * @param {*} error 
   * @returns {Promise<any>} 
   * @memberof UserService
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}