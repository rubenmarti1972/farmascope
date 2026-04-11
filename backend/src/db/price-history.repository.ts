import { supabase } from './supabase.client';
import { Product, DistributorPrice } from '../types';

export async function saveSnapshot(product: Product, prices: DistributorPrice[]): Promise<string> {
  const { data: snapshot, error: snapError } = await supabase
    .from('product_snapshots')
    .insert({
      code: product.code,
      name: product.name,
      genericName: product.genericName,
      laboratory: product.laboratory,
      presentation: product.presentation,
      unit: product.unit,
      currentStock: product.currentStock,
      minimumStock: product.minimumStock,
      stockDeficit: product.stockDeficit,
    })
    .select('id')
    .single();

  if (snapError) throw new Error(`Error saving snapshot: ${snapError.message}`);

  const priceRows = prices.map((p) => ({
    productId: snapshot.id,
    distributorId: p.distributorId,
    distributorName: p.distributorName,
    unitPrice: p.unitPrice,
    packPrice: p.packPrice,
    packQuantity: p.packQuantity,
    available: p.available,
    url: p.url ?? null,
  }));

  const { error: priceError } = await supabase.from('price_history').insert(priceRows);
  if (priceError) throw new Error(`Error saving prices: ${priceError.message}`);

  return snapshot.id;
}

export async function getLatestPriceHistory(productName: string, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from('price_history')
    .select('*, product:product_snapshots(name, genericName)')
    .gte('checkedAt', since.toISOString())
    .order('checkedAt', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
