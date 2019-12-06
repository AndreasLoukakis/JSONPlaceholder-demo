import { Component, OnInit, Input } from '@angular/core';
import { Address } from './../../../../common/models/user.interface';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input()
  address: Address;
  mapLink: string;

  private mapLinkTemplate = 'https://www.google.com/maps/search/?api=1&query={lat},{lng}';

  constructor() { }

  ngOnInit() {
    if (this.address && this.address.geo) {
      this.mapLink = this.mapLinkTemplate
        .replace('{lat}', this.address.geo.lng)
        .replace('{lng}', this.address.geo.lng);
    }
  }

}
