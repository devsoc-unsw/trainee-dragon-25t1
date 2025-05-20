import { ObjectId } from 'mongodb';

// Auth
export type SessionId = string;
export type Name = string;
export type UserId = number;
export type Email = string; // has "@[some letters > 0].[some letters > 1]"
export type Password = string; // greater than 6 characters & (?=.*\d)(?=.*[a-z])(?=.*[A-Z])

// Mail
export type MailId = number; // should be unique for EVERY user
export type Sender = Email;
export type Receivers = Email[];
export type Title = string; // max 50 characters
export type TimeSent = Date; // js date
export type Message = string;

export type Read = boolean;

// Deleting Mail
export type MailIds = MailId[];

// Database Types
export type UserMail = { MailId: Read };

export type Session = {
  _id: ObjectId;
  sessionId: SessionId;
  userId: UserId;
};

export interface Spot {
  latitude: number;
  longitude: number;
  zLevel: number;
  seats: number;
  noiseLevel: number;
  comfortability: number;
  popularity: number;
};

export type User = {
  // _id: ObjectId,
  name: Name;
  email: Email;
  password: Password;
  bookmarks: Array<GeoSpot>;
  likes: Array<GeoSpot>;
  dislikes: Array<GeoSpot>;
  userId: UserId;
};


export type SpotLngLat = {
  lng: number;
  lat: number;
};

export interface GeoSpot extends SubHistory  {
  lngLat: SpotLngLat;
  zLevel: number;
}

export type SubHistory = {
  currentTime: string;
  userId: UserId;
}

// types for dataStore
export type SessionStore = {
  sessions: Session[];
};

export type DataStore = {
  _id: ObjectId;
  users: User[];
  spots: Spot[];
  histories: GeoSpot[]; 
  // histories: Map<UserId, GeoSpot>;
};
