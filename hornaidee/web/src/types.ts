export interface Dorm {
    id: number;
    owner: string;
    name: string;
    address: string;
    property_number: string;
    city?: string;
    province: string;
    zip_code: string;
    rent_price: number;
    latitude: number;
    longitude: number;
    dorms_facilities: DormFacility[];
    photos: string[];
    average_stars?: number;
    distance: number;
}

export interface DormFacility {
    id: number;
    name: string;
}

export interface DormDiff {
    added: Dorm[];
    removed: Dorm[];
    updated: Dorm[];
}