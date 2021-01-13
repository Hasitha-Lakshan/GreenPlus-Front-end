export class OrderCreatingPayload {

    shopId: string;
    buyerUsername: string;
    deliveryAddressLine1: string;
    deliveryAddressLine2: string;
    deliveryAddressLine3: string;
    deliveryLocation: string;
    note: string;
    quantity: number;
    totalPrice: number;
    createdDate: string;
    dueDate: string;
    unit: string;
}