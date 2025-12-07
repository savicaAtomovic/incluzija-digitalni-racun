import { EventItem } from './event-item';

export interface MainEvent {
  id: number;
  name: string;
  nameALB?: string;
  description: string;
  descriptionALB: string;
  image: string;
  eventItems: EventItem[];
}
