import { OrderGuide, PreOrder, PreOrderItem } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { saveOrderGuide, getOrderGuides, confirmOrderItem } from '../db/order-guide.repository';

interface CreateOrderGuideInput {
  items: Array<{
    productId: string;
    productCode: string;
    productName: string;
    genericName: string;
    presentation: string;
    quantityToOrder: number;
    unitPrice: number;
    distributorId: string;
    distributorName: string;
  }>;
}

export class OrderStore {
  private guides: OrderGuide[] = [];

  createGuides(input: CreateOrderGuideInput): OrderGuide[] {
    const groupedByDistributor = new Map<string, typeof input.items>();

    for (const item of input.items) {
      const existing = groupedByDistributor.get(item.distributorId) ?? [];
      groupedByDistributor.set(item.distributorId, [...existing, item]);
    }

    const guides: OrderGuide[] = [];

    for (const [distributorId, distItems] of groupedByDistributor) {
      const orderItems: PreOrderItem[] = distItems.map((i) => ({
        ...i,
        totalPrice: i.unitPrice * i.quantityToOrder,
      }));

      const order: PreOrder = {
        id: uuidv4(),
        distributorId,
        distributorName: distItems[0].distributorName,
        items: orderItems,
        subtotal: orderItems.reduce((sum, i) => sum + i.totalPrice, 0),
        createdAt: new Date(),
        status: 'pending',
      };

      const guide: OrderGuide = {
        guideId: uuidv4(),
        generatedAt: new Date(),
        orders: [order],
        grandTotal: order.subtotal,
      };

      guides.push(guide);
      this.guides.push(guide);
      saveOrderGuide(guide).catch((err) =>
        console.error('[OrderStore] Error saving to Supabase:', err)
      );
    }

    return guides;
  }

  getGuide(id: string): OrderGuide | undefined {
    return this.guides.find((g) => g.guideId === id);
  }

  async getAllGuides(): Promise<OrderGuide[]> {
    try {
      const rows = await getOrderGuides();
      if (rows && rows.length > 0) return rows as unknown as OrderGuide[];
    } catch (err) {
      console.warn('[OrderStore] Falling back to in-memory guides:', err);
    }
    return [...this.guides].sort(
      (a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    );
  }

  confirmOrder(guideId: string, orderId: string): PreOrder | null {
    const guide = this.guides.find((g) => g.guideId === guideId);
    if (!guide) return null;
    const order = guide.orders.find((o) => o.id === orderId);
    if (!order) return null;
    order.status = 'confirmed';
    confirmOrderItem(guideId, order.distributorId).catch(console.error);
    return order;
  }
}
