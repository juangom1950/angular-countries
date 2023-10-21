import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {

    // because I know that this is an observable we have access to the pipes
    this.activatedRoute.params
      .pipe(
        // Este recibe el valor anterior. "params" in this case and it creates a new observable
        // base on the pass observable, so we can subcribe to it.
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
      )
      // Here we are subscribe to the result of that new observable
      .subscribe( country => {
        if ( !country ) return this.router.navigateByUrl('');
        return this.country = country;
      });
  }




}
