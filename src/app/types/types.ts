export type PriceDirection = "up" | "down" | "same";
export interface PriceChange {
    dir: PriceDirection;
    pct: number;
}

export interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: PriceChange;
}