
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// InvestBridge Firebase Service Layer
export const investBridgeFirebaseService = {
  // Create new document in specified collection
  async createDocument(collectionName: string, documentData: any) {
    if (!db) {
      console.warn('InvestBridge: Firestore unavailable - using mock operation');
      const mockDocId = 'mock-doc-' + Date.now();
      console.log(`InvestBridge: Mock document created with ID: ${mockDocId}`, documentData);
      return mockDocId;
    }
    
    try {
      console.log(`InvestBridge: Creating document in collection ${collectionName}:`, documentData);
      const documentRef = await addDoc(collection(db, collectionName), {
        ...documentData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`InvestBridge: Document successfully created with ID: ${documentRef.id}`);
      return documentRef.id;
    } catch (createError) {
      console.error(`InvestBridge: Failed to create document in ${collectionName}:`, createError);
      throw createError;
    }
  },

  // Update existing document
  async updateDocument(collectionName: string, documentId: string, updateData: any) {
    if (!db) {
      console.warn('InvestBridge: Firestore unavailable - using mock operation');
      console.log(`InvestBridge: Mock update for document ${documentId} in ${collectionName}:`, updateData);
      return;
    }
    
    try {
      console.log(`InvestBridge: Updating document ${documentId} in ${collectionName}:`, updateData);
      const documentRef = doc(db, collectionName, documentId);
      await updateDoc(documentRef, {
        ...updateData,
        updatedAt: new Date()
      });
      console.log(`InvestBridge: Document ${documentId} updated successfully`);
    } catch (updateError) {
      console.error(`InvestBridge: Failed to update document ${documentId} in ${collectionName}:`, updateError);
      throw updateError;
    }
  },

  // Delete document from collection
  async deleteDocument(collectionName: string, documentId: string) {
    if (!db) {
      console.warn('InvestBridge: Firestore unavailable - using mock operation');
      console.log(`InvestBridge: Mock deletion of document ${documentId} from ${collectionName}`);
      return;
    }
    
    try {
      console.log(`InvestBridge: Deleting document ${documentId} from ${collectionName}`);
      await deleteDoc(doc(db, collectionName, documentId));
      console.log(`InvestBridge: Document ${documentId} deleted successfully`);
    } catch (deleteError) {
      console.error(`InvestBridge: Failed to delete document ${documentId} from ${collectionName}:`, deleteError);
      throw deleteError;
    }
  },

  // Query documents by field value
  async queryDocuments(collectionName: string, fieldName: string, fieldValue: any) {
    if (!db) {
      console.warn('InvestBridge: Firestore unavailable - returning mock data');
      const mockResults = [
        { id: 'mock-result-1', [fieldName]: fieldValue, title: 'Mock Query Result 1' },
        { id: 'mock-result-2', [fieldName]: fieldValue, title: 'Mock Query Result 2' }
      ];
      console.log(`InvestBridge: Mock query returned ${mockResults.length} results from ${collectionName}`);
      return mockResults;
    }
    
    try {
      console.log(`InvestBridge: Querying ${collectionName} where ${fieldName} equals ${fieldValue}`);
      const queryRef = query(collection(db, collectionName), where(fieldName, '==', fieldValue));
      const querySnapshot = await getDocs(queryRef);
      const queryResults = querySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));
      console.log(`InvestBridge: Query returned ${queryResults.length} documents from ${collectionName}`);
      return queryResults;
    } catch (queryError) {
      console.error(`InvestBridge: Query failed for ${collectionName}:`, queryError);
      throw queryError;
    }
  }
};

// Legacy alias for backward compatibility
export const firebaseService = investBridgeFirebaseService;
