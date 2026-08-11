import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  status: 'Active' | 'Draft';
  icon: string;
  badge: string;
  desc: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = 'deesontech_products';

const defaultProducts: Product[] = [
  { id: 1, name: 'CloudSync Pro', category: 'Cloud', price: '$299/mo', status: 'Active', icon: '☁️', badge: 'Popular', desc: 'Enterprise-grade cloud synchronization platform for seamless data management across all your devices and teams.' },
  { id: 2, name: 'SecureVault', category: 'Security', price: '$199/mo', status: 'Active', icon: '🔒', badge: 'New', desc: 'Military-grade encryption solution with zero-knowledge architecture protecting your most sensitive business data.' },
  { id: 3, name: 'DataFlow Analytics', category: 'Analytics', price: '$399/mo', status: 'Active', icon: '📊', badge: 'Enterprise', desc: 'Real-time BI dashboard with AI-powered insights, custom reports, and predictive analytics capabilities.' },
  { id: 4, name: 'TeamHub', category: 'Communication', price: '$49/mo', status: 'Active', icon: '💬', badge: 'Startup', desc: 'All-in-one team communication platform with video calls, messaging, file sharing, and project boards.' },
  { id: 5, name: 'DeployPilot', category: 'DevOps', price: '$249/mo', status: 'Active', icon: '🚀', badge: 'New', desc: 'Automated CI/CD pipeline manager with one-click deployments, rollback, and infrastructure-as-code support.' },
  { id: 6, name: 'ShieldGuard', category: 'Security', price: '$349/mo', status: 'Active', icon: '🛡️', badge: 'Enterprise', desc: 'Advanced threat detection and response system with 24/7 monitoring, SIEM integration, and compliance tools.' },
  { id: 7, name: 'CloudStore', category: 'Cloud', price: '$99/mo', status: 'Active', icon: '💾', badge: 'Starter', desc: 'Scalable object storage solution with global CDN, versioning, and lifecycle management for any file type.' },
  { id: 8, name: 'InsightIQ', category: 'Analytics', price: '$179/mo', status: 'Active', icon: '🧠', badge: 'AI', desc: 'AI-driven customer analytics platform that uncovers behavioral patterns and predicts churn before it happens.' },
  { id: 9, name: 'PipelineX', category: 'DevOps', price: '$199/mo', status: 'Active', icon: '⚙️', badge: 'Popular', desc: 'Container orchestration and microservices management platform built for cloud-native development teams.' },
];

function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore parse errors */
  }
  return defaultProducts;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(loadProducts);

  // Persist to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
      return [...prev, { id: newId, ...product }];
    });
  };

  const updateProduct = (id: number, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used within a ProductsProvider');
  return context;
}
