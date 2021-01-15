export class OrderDetailsPayload {

    shopTitle: string;
    category: string;
    subCategory: string;
    farmerUsername: string;
    buyerUsername: string;
    note: string;
    quantity: number;
    unit: string;
    totalPrice: number;
    createdDate: string;
    dueDate: Date;
    completedDate: string;
    orderStatus: string;
    deliveryDays: number;
    deliveryAddressLine1: string;
    deliveryAddressLine2: string;
    deliveryAddressLine3: string;
    deliveryLocation: string;
}