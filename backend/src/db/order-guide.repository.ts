import { supabase } from './supabase.client';
import { OrderGuide } from '../types';

export async function saveOrderGuide(guide: OrderGuide): Promise<void> {
  const { error: guideError } = await supabase
    .from('order_guides')
    .insert({
      id: guide.guideId,
      generatedAt: guide.generatedAt,
      grandTotal: guide.grandTotal,
      status: 'PENDING',
    });

  if (guideError) throw new Error(`Error saving guide: ${guideError.message}`);

  const items = guide.orders.flatMap((order) =>
    order.items.map((item) => ({
      guideId: guide.guideId,
      productId: item.productId,
      productCode: item.productCode,
      productName: item.productName,
      genericName: item.genericName,
      presentation: item.presentation,
      distributorId: item.distributorId,
      distributorName: item.distributorName,
      quantityToOrder: item.quantityToOrder,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      status: order.status === 'confirmed' ? 'CONFIRMED' : 'PENDING',
    }))
  );

  const { error: itemsError } = await supabase.from('order_items').insert(items);
  if (itemsError) throw new Error(`Error saving order items: ${itemsError.message}`);
}

export async function getOrderGuides() {
  const { data, error } = await supabase
    .from('order_guides')
    .select('*, items:order_items(*)')
    .order('generatedAt', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function confirmOrderItem(guideId: string, distributorId: string): Promise<void> {
  const { error } = await supabase
    .from('order_items')
    .update({ status: 'CONFIRMED' })
    .eq('guideId', guideId)
    .eq('distributorId', distributorId);

  if (error) throw new Error(error.message);
}
