
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useRealTimeData = (collectionName: string, constraints: QueryConstraint[] = []) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`Setting up real-time listener for ${collectionName}`);
    
    if (!db) {
      console.warn('Firestore not available - using mock data');
      // Provide mock data when Firebase is not configured
      const mockData = collectionName === 'proposals' 
        ? [
            { id: '1', title: 'AI Healthcare Platform', description: 'Revolutionary AI for healthcare', fundingRequired: 500000, sector: 'Healthcare' },
            { id: '2', title: 'Green Energy Startup', description: 'Sustainable energy solutions', fundingRequired: 1000000, sector: 'Energy' }
          ]
        : [
            { id: '1', name: 'John Investor', email: 'john@investor.com', investmentRange: '$100K-$500K', sectors: ['Technology', 'Healthcare'] },
            { id: '2', name: 'Sarah Capital', email: 'sarah@capital.com', investmentRange: '$500K+', sectors: ['Energy', 'Finance'] }
          ];
      
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 1000);
      
      return;
    }
    
    try {
      const q = query(collection(db, collectionName), ...constraints);
      
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(documents);
          setLoading(false);
          console.log(`Real-time data updated for ${collectionName}:`, documents.length, 'items');
        },
        (err) => {
          console.error(`Real-time listener error for ${collectionName}:`, err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => {
        console.log(`Cleaning up real-time listener for ${collectionName}`);
        unsubscribe();
      };
    } catch (err) {
      console.error(`Error setting up real-time listener for ${collectionName}:`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, [collectionName]);

  return { data, loading, error };
};
