export class ProfileShopPayload {
    
    shopId: number;
    title: string;
    priceOfOneUnit: number;
    location: string;
    createdDate: Date;
    pictureName: string;
	pictureType: string;
	pictureBytes: Blob;
}