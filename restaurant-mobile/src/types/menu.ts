export interface MenuCategory {
    id: number;
    name: string;
}

export interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    price: string;
    imageURL: string | null;
    availability: "onsite" | "online" | "both" | "none";
    category: MenuCategory;
}