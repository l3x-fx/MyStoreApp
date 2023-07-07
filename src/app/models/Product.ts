export interface Product {
    id:number;
    title: string;
    description: string;
    imgurl: string;
    price: number;
    quantity: number;
}

export interface RawProduct {
        id: number,
        name: string,
        description: string,
        url: string,
        price: number,
        category: string
}