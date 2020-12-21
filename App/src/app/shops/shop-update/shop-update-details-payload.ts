export class ShopUpdateDetailsPayload {
    
    shopId: number;
    title: string;
	description: string;
	category: string;
	subCategory: string;
	unit: string;
	priceOfOneUnit: number;
	location: string;
	createdDate: Date;
	deliveryDays: number;
	shopStatus: boolean;
}