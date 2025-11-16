
export enum Step {
  Welcome,
  Size,
  Delivery,
  Address,
  Schedule,
  Summary,
}

export type DeliveryMethod = 'Entrega em casa' | 'Retirada rápida';

declare global {
  interface Window {
    clarity: (action: string, key?: string, value?: any) => void;
  }
}
