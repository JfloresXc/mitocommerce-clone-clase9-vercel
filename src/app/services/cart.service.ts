import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  rating: number;
  specs?: string[];
  stockProgress?: number;
  timeLeft?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Catálogo completo de artículos de mascota
  public readonly catalog: Product[] = [
    {
      id: 1,
      name: 'Comedero Inteligente MitoFeeder Pro',
      description: 'Dispensador automático con cámara Full HD 1080p, audio bidireccional y programación desde App.',
      price: 129.99,
      originalPrice: 179.99,
      imageUrl: 'images/feeder.png',
      category: 'Tecnología',
      rating: 4.8,
      specs: [
        'Capacidad de 4 litros para comida seca.',
        'Cámara Full HD con visión nocturna automática.',
        'Audio bidireccional para hablar con tu mascota.',
        'Alertas de nivel bajo de comida directas al móvil.'
      ]
    },
    {
      id: 2,
      name: 'Arnés Acolchado Anti-tirones',
      description: 'Arnés ergonómico para paseos cómodos, diseño reforzado y tejido transpirable.',
      price: 24.99,
      originalPrice: 39.99,
      imageUrl: 'images/harness.png',
      category: 'Paseo',
      rating: 4.6,
      stockProgress: 75,
      timeLeft: '02h 45m'
    },
    {
      id: 3,
      name: 'Rascador Multinivel para Gatos',
      description: 'Estructura estable con postes de sisal natural y plataformas acolchadas premium.',
      price: 89.99,
      originalPrice: 129.99,
      imageUrl: 'images/cattree.png',
      category: 'Hogar',
      rating: 4.9,
      stockProgress: 40,
      timeLeft: '05h 12m'
    },
    {
      id: 4,
      name: 'Cama Ortopédica Viscoelástica',
      description: 'Cama ergonómica de espuma viscoelástica que alivia las articulaciones. Lavable y duradera.',
      price: 45.99,
      originalPrice: 59.99,
      imageUrl: 'images/bed.png',
      category: 'Descanso',
      rating: 4.7
    },
    {
      id: 5,
      name: 'Alimento Orgánico Premium (10kg)',
      description: 'Croquetas balanceadas con ingredientes 100% naturales, pollo de corral y verduras frescas.',
      price: 59.90,
      originalPrice: 69.90,
      imageUrl: 'images/food.png',
      category: 'Nutrición',
      rating: 4.8
    },
    {
      id: 6,
      name: 'Juguete Interactivo Dispensador',
      description: 'Pelota de goma ultra resistente que libera premios lentamente para estimulación mental.',
      price: 18.50,
      imageUrl: 'images/toy.png',
      category: 'Juguetes',
      rating: 4.5
    },
    {
      id: 7,
      name: 'Impermeable Reflectante Amarillo',
      description: 'Chubasquero ligero y ajustable con tiras altamente reflectantes para paseos con lluvia.',
      price: 22.00,
      originalPrice: 28.50,
      imageUrl: 'images/raincoat.png',
      category: 'Ropa',
      rating: 4.7
    }
  ];

  // Cupones disponibles
  public readonly availableCoupons: Coupon[] = [
    { code: 'MASCOTA10', discountType: 'percentage', value: 10, description: '10% de descuento en el total de tu compra' },
    { code: 'DOGDAY', discountType: 'percentage', value: 15, description: '15% de descuento en artículos seleccionados' },
    { code: 'ENVIOFREE', discountType: 'fixed', value: 0, description: 'Envío gratuito sin mínimo de compra' }
  ];

  // Signals para gestionar el estado
  public readonly cartItems = signal<CartItem[]>([]);
  public readonly isCartOpen = signal<boolean>(false);
  public readonly isSearchOpen = signal<boolean>(false);
  public readonly activeCoupon = signal<Coupon | null>(null);
  public readonly searchQuery = signal<string>('');

  // Computed Signals
  public readonly cartCount = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
  });

  public readonly subtotal = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  public readonly discount = computed(() => {
    const coupon = this.activeCoupon();
    if (!coupon) return 0;
    
    if (coupon.discountType === 'percentage') {
      return parseFloat((this.subtotal() * (coupon.value / 100)).toFixed(2));
    }
    return coupon.value; // Para ENVIOFREE el descuento en productos es 0 pero afecta envío
  });

  public readonly shipping = computed(() => {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    
    // Si tiene cupón ENVIOFREE o la compra supera los $50, el envío es gratis
    const coupon = this.activeCoupon();
    if ((coupon && coupon.code === 'ENVIOFREE') || sub >= 50) {
      return 0;
    }
    return 5.00; // Costo de envío base
  });

  public readonly total = computed(() => {
    const value = this.subtotal() - this.discount() + this.shipping();
    return Math.max(0, parseFloat(value.toFixed(2)));
  });

  // Filtrado de búsqueda dinámico (siempre retorna máximo 3 productos)
  public readonly searchResults = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      // Retorna 3 recomendados inicialmente (por ejemplo, los 3 primeros de tecnología/ofertas)
      return this.catalog.slice(0, 3);
    }
    return this.catalog
      .filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
      .slice(0, 3);
  });

  // Métodos de Carrito
  public addToCart(product: Product, quantity = 1) {
    this.cartItems.update(items => {
      const existing = items.find(item => item.product.id === product.id);
      if (existing) {
        return items.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...items, { product, quantity }];
    });
    // Abrir el carrito automáticamente al agregar
    this.isCartOpen.set(true);
  }

  public updateQuantity(productId: number, change: number) {
    this.cartItems.update(items => {
      return items.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  }

  public removeFromCart(productId: number) {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  public applyCoupon(code: string): boolean {
    const coupon = this.availableCoupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (coupon) {
      this.activeCoupon.set(coupon);
      return true;
    }
    return false;
  }

  public removeCoupon() {
    this.activeCoupon.set(null);
  }

  public clearCart() {
    this.cartItems.set([]);
    this.activeCoupon.set(null);
  }

  // Métodos de visualización
  public openCart() {
    this.isCartOpen.set(true);
  }

  public closeCart() {
    this.isCartOpen.set(false);
  }

  public openSearch() {
    this.isSearchOpen.set(true);
    this.searchQuery.set('');
  }

  public closeSearch() {
    this.isSearchOpen.set(false);
  }
}
