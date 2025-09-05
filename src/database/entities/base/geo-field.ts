/*
{
  type: {
    type: string;
    required: false;
    default: 'Point';
  };
  coordinates: {
    type: [number]; // [longitude, latitude]
    required: false;
  };
}
*/
export class GeoField {
  type: string;
  coordinates: number[];
}
