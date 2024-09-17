export type ZipCode = {
  id: string;
  lockdownDay: number;
  zipCode: string;
  createdAt: Date;
};

export interface ZipCodeApiResponse {
  postcode: string;
  number: number;
  street: string;
  city: string;
  municipality: string;
  province: string;
  location: Location;
}

export interface Location {
  type: string;
  coordinates: number[];
}
