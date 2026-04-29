export type User = {
  auth0Id: string;
  email: string;
};

export type UpdateUser = {
  address: string;
  city: string;
  country: string;
  name: string;
};

export type BackEndUser = User &
  UpdateUser & {
    _id: string;
  };
