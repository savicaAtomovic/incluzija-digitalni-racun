import { EventItem } from './event-item';

export interface MainEvent {
  id: number;
  name: string;
  description: string;
  image: string;
  eventItems: EventItem[];
}
