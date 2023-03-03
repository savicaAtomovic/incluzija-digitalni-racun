import { EventItem } from './event-item';

export interface MainEvent {
  id: number;
  name: string;
  description: string;
  descriptionAlb: string;
  image: string;
  eventItems: EventItem[];
}
