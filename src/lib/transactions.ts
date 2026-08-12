import { db } from "../firebase";
import type { Transaction } from "../types/index";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

// Public Constants
const transactionRefs = collection(db, "transactions");


/**
 * Fetches all transactions from the collection.
 * @returns All transactions currently in Firestore.
 */
export async function getAllTransactions(): Promise<Transaction[]> {
  try {
    const snapshot = await getDocs(transactionRefs);
    return snapshot.docs.map((doc:any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transaction[];
  } catch (error) {
    console.error("Error fetching all transactions: ", error);
    throw error;
  }
}

/**
 * Fetches a single transaction by id.
 * @param id - The order document id.
 * @returns The order, or null if no document exists with that id.
 */
export async function getTransactionById(id: string): Promise<Transaction | null> {
  try {
    const snapshot = await getDoc(doc(db, "transaction", id));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Transaction;
  } catch (error) {
    console.error("Error fetching order: ", error);
    throw error;
  }
}

/**
 * Fetches a single transaction by date.
 * @param id - The order document id.
 * @returns The order, or null if no document exists with that id.
 */
export async function getTransactionByDate(createdAt: string): Promise<Transaction | null> {
  try {
    const snapshot = await getDoc(doc(db, "createdAt", createdAt));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Transaction;
  } catch (error) {
    console.error("Error fetching order: ", error);
    throw error;
  }
}

/**
 * Creates a new product document in Firestore.
 * @param product - Product data without an id (Firestore generates it).
 * @returns The generated document id.
 */

export async function createTransaction(transaction: Omit<Transaction, "id">): Promise<string> {
  try {
    const docRef = await addDoc(transactionRefs, transaction);
    return docRef.id;
  } catch (error) {
    console.error("Error adding transaction: ", error);
    throw error;
  }
}


/**
 * Updates fields on an existing transaction. Only the passed fields are changed;
 * everything else on the document is left as-is.
 * @param id - The transaction document id.
 * @param updates - Partial transaction fields to update (id excluded).
 */
export async function updateTransaction(
  id: string,
  updates: Partial<Omit<Transaction, "id">>
): Promise<void> {
  try {
    await updateDoc(doc(db, "transactions", id), updates);
  } catch (error) {
    console.error("Error updating transaction: ", error);
    throw error;
  }
}


/**
 * Deletes a transaction document by id.
 * @param id - The transaction document id.
 */
export async function deleteTransaction(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "transactions", id));
  } catch (error) {
    console.error("Error deleting transaction: ", error);
    throw error;
  }
}