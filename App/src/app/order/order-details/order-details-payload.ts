export class OrderDetailsPayload {

    shopTitle: string;
    farmerUsername: string;
    buyerUsername: string;
    note: string;
    quantity: number;
    unit: string;
    totalPrice: number;
    createdDate: Date;
    dueDate: Date;
    completedDate: Date;
    orderStatus: string;
    deliveryDays: number;
    deliveryAddressLine1: string;
    deliveryAddressLine2: string;
    deliveryAddressLine3: string;
    deliveryLocation: string;
}