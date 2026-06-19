import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../interfaces/product';
import { cartReducer } from '@store/cart/cart.reducer';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch } from '@angular/common/http';

const mockProducts: Product[] = [
  { id: '1', name: 'Laptop',  price: 999, rating: 3, stock: 5,  category: 'Electronics', image: 'laptop.jpg' },
  { id: '2', name: 'Mouse',   price: 29,  rating: 4, stock: 20, category: 'Electronics', image: 'mouse.jpg'  },
  { id: '3', name: 'Teclado', price: 59,  rating: 5, stock: 15, category: 'Electronics', image: 'teclado.jpg'},
];

describe('ProductList + ProductCard Integration', () => {
  let fixture: ComponentFixture<ProductList>;
  let component: ProductList;
  let compiledElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ✅ Integración: usamos los componentes REALES, no mocks
      imports: [ProductList, ProductCard],
      providers: [
        provideStore({ cart: cartReducer }),
        provideHttpClient(withFetch()),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    compiledElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('debería crear el componente ProductList', () => {
    expect(component).toBeTruthy();
  });

  it('no debería renderizar tarjetas si el array de productos está vacío', () => {
    fixture.componentRef.setInput('products', []);
    fixture.detectChanges();

    const cards = compiledElement.querySelectorAll('app-product-card');
    expect(cards.length).toBe(0);
  });

  it('debería renderizar un app-product-card por cada producto recibido', () => {
    // Aquí verificamos que ProductList le pasa los datos correctamente a ProductCard
    fixture.componentRef.setInput('products', mockProducts);
    fixture.detectChanges();

    const cards = compiledElement.querySelectorAll('app-product-card');
    expect(cards.length).toBe(mockProducts.length); // 3
  });

  it('debería mostrar el nombre de cada producto en su tarjeta', () => {
    fixture.componentRef.setInput('products', mockProducts);
    fixture.detectChanges();

    // Verificamos que el binding [product]="product" llegó correctamente al template de ProductCard
    const titles = compiledElement.querySelectorAll('a.title');
    expect(titles[0].textContent?.trim()).toBe('Laptop');
    expect(titles[1].textContent?.trim()).toBe('Mouse');
    expect(titles[2].textContent?.trim()).toBe('Teclado');
  });

  it('debería renderizar las estrellas de rating de cada ProductCard', () => {
    fixture.componentRef.setInput('products', mockProducts);
    fixture.detectChanges();

    // Cada tarjeta tiene su ratingArray computed: producto[2] tiene rating 5 → 5 estrellas
    const thirdCard = compiledElement.querySelectorAll('app-product-card')[2];
    const stars = thirdCard.querySelectorAll('.ri-star-fill');
    expect(stars.length).toBe(5);
  });
});
