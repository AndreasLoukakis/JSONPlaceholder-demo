export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Latlong;
}

export interface Latlong {
    lat: string;
    lng: string;
}

export interface CompanyData {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name?: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: CompanyData;
}
