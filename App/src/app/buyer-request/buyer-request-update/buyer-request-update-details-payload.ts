export class BuyerRequestUpdateDetailsPayload {

    buyerRequestId: number;
    title: string;
    description: string;
    category: string;
    subCategory: string;
    unit: string;
    quantity: number;
    price: number;
    location: string;
    createdDate: Date;
    expectDays: number;
    buyerRequestStatus: boolean;
}