import { Product, DistributorPrice } from '../types';

const DRUG_CATALOG: Array<{ name: string; generic: string; lab: string; presentation: string; doses: string[] }> = [
  { name: 'Acetaminofén', generic: 'Acetaminofén', lab: 'Genfar', presentation: 'tabletas', doses: ['500mg', '1g'] },
  { name: 'Ibuprofeno', generic: 'Ibuprofeno', lab: 'MK', presentation: 'tabletas', doses: ['200mg', '400mg', '600mg'] },
  { name: 'Amoxicilina', generic: 'Amoxicilina', lab: 'Lafrancol', presentation: 'cápsulas', doses: ['250mg', '500mg'] },
  { name: 'Metformina', generic: 'Metformina HCl', lab: 'Tecnoquímicas', presentation: 'tabletas', doses: ['500mg', '850mg', '1g'] },
  { name: 'Losartán', generic: 'Losartán Potásico', lab: 'Bayer', presentation: 'tabletas', doses: ['25mg', '50mg', '100mg'] },
  { name: 'Atorvastatina', generic: 'Atorvastatina Cálcica', lab: 'Pfizer', presentation: 'tabletas', doses: ['10mg', '20mg', '40mg', '80mg'] },
  { name: 'Omeprazol', generic: 'Omeprazol', lab: 'Genfar', presentation: 'cápsulas', doses: ['10mg', '20mg', '40mg'] },
  { name: 'Amlodipino', generic: 'Amlodipino Besilato', lab: 'Novartis', presentation: 'tabletas', doses: ['5mg', '10mg'] },
  { name: 'Enalapril', generic: 'Enalapril Maleato', lab: 'MSD', presentation: 'tabletas', doses: ['5mg', '10mg', '20mg'] },
  { name: 'Azitromicina', generic: 'Azitromicina', lab: 'Pfizer', presentation: 'cápsulas', doses: ['250mg', '500mg'] },
  { name: 'Ciprofloxacina', generic: 'Ciprofloxacina HCl', lab: 'Bayer', presentation: 'tabletas', doses: ['250mg', '500mg', '750mg'] },
  { name: 'Diclofenaco', generic: 'Diclofenaco Sódico', lab: 'Novartis', presentation: 'tabletas', doses: ['50mg', '75mg', '100mg'] },
  { name: 'Ranitidina', generic: 'Ranitidina HCl', lab: 'Genfar', presentation: 'tabletas', doses: ['150mg', '300mg'] },
  { name: 'Metronidazol', generic: 'Metronidazol', lab: 'Lafrancol', presentation: 'tabletas', doses: ['250mg', '500mg'] },
  { name: 'Clonazepam', generic: 'Clonazepam', lab: 'Roche', presentation: 'tabletas', doses: ['0.5mg', '1mg', '2mg'] },
  { name: 'Alprazolam', generic: 'Alprazolam', lab: 'Pfizer', presentation: 'tabletas', doses: ['0.25mg', '0.5mg', '1mg'] },
  { name: 'Glibenclamida', generic: 'Glibenclamida', lab: 'Sanofi', presentation: 'tabletas', doses: ['2.5mg', '5mg'] },
  { name: 'Captopril', generic: 'Captopril', lab: 'MK', presentation: 'tabletas', doses: ['12.5mg', '25mg', '50mg'] },
  { name: 'Furosemida', generic: 'Furosemida', lab: 'Sanofi', presentation: 'tabletas', doses: ['20mg', '40mg', '80mg'] },
  { name: 'Hidroclorotiazida', generic: 'Hidroclorotiazida', lab: 'Novartis', presentation: 'tabletas', doses: ['12.5mg', '25mg', '50mg'] },
  { name: 'Espironolactona', generic: 'Espironolactona', lab: 'Pfizer', presentation: 'tabletas', doses: ['25mg', '50mg', '100mg'] },
  { name: 'Propranolol', generic: 'Propranolol HCl', lab: 'AstraZeneca', presentation: 'tabletas', doses: ['10mg', '40mg', '80mg'] },
  { name: 'Atenolol', generic: 'Atenolol', lab: 'AstraZeneca', presentation: 'tabletas', doses: ['25mg', '50mg', '100mg'] },
  { name: 'Simvastatina', generic: 'Simvastatina', lab: 'MSD', presentation: 'tabletas', doses: ['10mg', '20mg', '40mg'] },
  { name: 'Rosuvastatina', generic: 'Rosuvastatina Cálcica', lab: 'AstraZeneca', presentation: 'tabletas', doses: ['5mg', '10mg', '20mg', '40mg'] },
  { name: 'Levotiroxina', generic: 'Levotiroxina Sódica', lab: 'Merck', presentation: 'tabletas', doses: ['25mcg', '50mcg', '100mcg', '150mcg'] },
  { name: 'Prednisona', generic: 'Prednisona', lab: 'Pfizer', presentation: 'tabletas', doses: ['5mg', '10mg', '20mg', '50mg'] },
  { name: 'Dexametasona', generic: 'Dexametasona', lab: 'MSD', presentation: 'tabletas', doses: ['0.5mg', '4mg', '8mg'] },
  { name: 'Cetirizina', generic: 'Cetirizina HCl', lab: 'UCB', presentation: 'tabletas', doses: ['5mg', '10mg'] },
  { name: 'Loratadina', generic: 'Loratadina', lab: 'Schering-Plough', presentation: 'tabletas', doses: ['5mg', '10mg'] },
  { name: 'Salbutamol', generic: 'Salbutamol Sulfato', lab: 'GlaxoSmithKline', presentation: 'tabletas', doses: ['2mg', '4mg'] },
  { name: 'Ambroxol', generic: 'Ambroxol HCl', lab: 'Boehringer', presentation: 'tabletas', doses: ['30mg', '75mg'] },
  { name: 'Clopidogrel', generic: 'Clopidogrel Bisulfato', lab: 'Sanofi', presentation: 'tabletas', doses: ['75mg', '300mg'] },
  { name: 'Aspirina', generic: 'Ácido Acetilsalicílico', lab: 'Bayer', presentation: 'tabletas', doses: ['100mg', '325mg', '500mg'] },
  { name: 'Warfarina', generic: 'Warfarina Sódica', lab: 'Bristol-Myers', presentation: 'tabletas', doses: ['1mg', '2.5mg', '5mg', '10mg'] },
  { name: 'Insulina Glargina', generic: 'Insulina Glargina', lab: 'Sanofi', presentation: 'viales', doses: ['100UI/mL'] },
  { name: 'Insulina NPH', generic: 'Insulina Isofana', lab: 'Novo Nordisk', presentation: 'viales', doses: ['100UI/mL'] },
  { name: 'Pantoprazol', generic: 'Pantoprazol Sódico', lab: 'Pfizer', presentation: 'tabletas', doses: ['20mg', '40mg'] },
  { name: 'Lansoprazol', generic: 'Lansoprazol', lab: 'Takeda', presentation: 'cápsulas', doses: ['15mg', '30mg'] },
  { name: 'Esomeprazol', generic: 'Esomeprazol Magnésico', lab: 'AstraZeneca', presentation: 'cápsulas', doses: ['20mg', '40mg'] },
  { name: 'Tramadol', generic: 'Tramadol HCl', lab: 'Grünenthal', presentation: 'cápsulas', doses: ['50mg', '100mg'] },
  { name: 'Ketorolaco', generic: 'Ketorolaco Trometamina', lab: 'Roche', presentation: 'tabletas', doses: ['10mg', '30mg'] },
  { name: 'Naproxeno', generic: 'Naproxeno Sódico', lab: 'Bayer', presentation: 'tabletas', doses: ['220mg', '275mg', '550mg'] },
  { name: 'Meloxicam', generic: 'Meloxicam', lab: 'Boehringer', presentation: 'tabletas', doses: ['7.5mg', '15mg'] },
  { name: 'Celecoxib', generic: 'Celecoxib', lab: 'Pfizer', presentation: 'cápsulas', doses: ['100mg', '200mg'] },
  { name: 'Gabapentina', generic: 'Gabapentina', lab: 'Pfizer', presentation: 'cápsulas', doses: ['100mg', '300mg', '400mg'] },
  { name: 'Pregabalina', generic: 'Pregabalina', lab: 'Pfizer', presentation: 'cápsulas', doses: ['25mg', '75mg', '150mg', '300mg'] },
  { name: 'Carbamazepina', generic: 'Carbamazepina', lab: 'Novartis', presentation: 'tabletas', doses: ['200mg', '400mg'] },
  { name: 'Fenitoína', generic: 'Fenitoína Sódica', lab: 'Pfizer', presentation: 'cápsulas', doses: ['100mg', '300mg'] },
  { name: 'Fluoxetina', generic: 'Fluoxetina HCl', lab: 'Eli Lilly', presentation: 'cápsulas', doses: ['10mg', '20mg', '40mg'] },
];

const PACK_SIZES = [10, 14, 20, 28, 30, 50, 100];

function generateProducts(): Product[] {
  const products: Product[] = [];
  let id = 1;

  for (const drug of DRUG_CATALOG) {
    for (const dose of drug.doses) {
      const packSize = PACK_SIZES[Math.floor(Math.random() * PACK_SIZES.length)];
      const minimumStock = [5, 6, 8, 10, 12, 15, 20][Math.floor(Math.random() * 7)];
      const currentStock = Math.floor(Math.random() * minimumStock);

      products.push({
        id: String(id),
        code: `MED${String(id).padStart(3, '0')}`,
        name: `${drug.name} ${dose} x${packSize} ${drug.presentation.charAt(0).toUpperCase() + drug.presentation.slice(1)}`,
        genericName: drug.generic,
        laboratory: drug.lab,
        presentation: `Caja x${packSize} ${drug.presentation}`,
        unit: 'Caja',
        currentStock,
        minimumStock,
        stockDeficit: minimumStock - currentStock,
      });

      id++;
      if (id > 200) break;
    }
    if (id > 200) break;
  }

  return products;
}

export const MOCK_LOW_STOCK_PRODUCTS: Product[] = generateProducts();

export const MOCK_DISTRIBUTORS = ['COFARVEN', 'BEHRENS', 'ALBEDI', 'PROVEFAR', 'DISPROFARMA'];

const randomBetween = (min: number, max: number): number =>
  Math.round((Math.random() * (max - min) + min) * 100) / 100;

export function generateMockPrices(productId: string): DistributorPrice[] {
  const basePrice = randomBetween(8000, 55000);

  return MOCK_DISTRIBUTORS.map((name, index) => {
    const available = Math.random() > 0.25;
    const variation = randomBetween(0.85, 1.2);
    const unitPrice = available ? Math.round(basePrice * variation) : 0;
    const packQuantity = [10, 20, 30, 50, 100][index % 5];

    return {
      distributorId: `dist_${index + 1}`,
      distributorName: name,
      unitPrice,
      packPrice: available ? unitPrice * packQuantity : 0,
      packQuantity,
      available,
      lastUpdated: new Date(),
      url: available ? `https://${name.toLowerCase().replace(/\s/g, '')}.com.ve/producto/${productId}` : undefined,
    };
  });
}
