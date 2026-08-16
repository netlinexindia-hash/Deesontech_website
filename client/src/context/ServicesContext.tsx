import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Service {
  id: number;
  title: string;
  status: 'Active' | 'Draft';
  icon: string;
  desc: string;
  features: string[] | null;
}

interface ServicesContextType {
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: number, data: Partial<Service>) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

function getToken() {
  return localStorage.getItem('admin_token');
}

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('Failed to fetch services');
      const data = await res.json();
      setServices(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<Service, 'id'>) => {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(service),
      });
      if (!res.ok) throw new Error('Failed to add service');
      const newService = await res.json();
      setServices((prev) => [...prev, newService]);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const updateService = async (id: number, data: Partial<Service>) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update service');
      const updatedService = await res.json();
      setServices((prev) => prev.map((s) => (s.id === id ? updatedService : s)));
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const deleteService = async (id: number) => {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete service');
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  return (
    <ServicesContext.Provider value={{ services, addService, updateService, deleteService, loading, error }}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) throw new Error('useServices must be used within a ServicesProvider');
  return context;
}
