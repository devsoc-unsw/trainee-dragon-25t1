export interface Place {
  name: string;
  address?: string;
  awards?: Award[];
  cuisine?: Cuisine[];
  num_reviews: number;
  phone?: string;
  photo?: Photo | any;
  price_level?: number | string;
  ranking?: string;
  rating?: number;
  website?: any;
  web_url?: any;
}

export interface Cuisine {
  key: number;
  name: string;
}

export interface Award {
  display_name: string;
  images: any;
}

export interface Photo {
  caption: string;
  helpful_votes: number;
  images: Images;
  is_blessed: true;
  published_date: any; // Date obj?
  uploaded_date: any; // Date obj?
}

interface Images {
  large: ImageContent;
  medium: ImageContent;
  small: ImageContent;
  thumbnail: ImageContent;
}

interface ImageContent {
  width: number;
  height: number;
  url: any;
}
