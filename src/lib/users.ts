import { db } from "../firebase";
import { type Address, type Admin, type Buyer, type User, type Vendor } from "../types/index";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

// Public Constant
const usersRef = collection(db, "users");
const addressRef = collection(db,"address");

/**
 * Fetches all users from the collection.
 * @returns All users currently in Firestore.
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const snapshot = await getDocs(usersRef);
    return snapshot.docs.map((doc:any) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
}

/**
 * Fetches a single user by id.
 * @param id - The user document id.
 * @returns The user, or null if no document exists with that id.
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const snapshot = await getDoc(doc(db, "users", id));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as User;
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}

/**
 * Fetches a single user by email.
 * @param email - The user's email address.
 * @returns The user, or null if no matching document exists.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docSnap = snapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as User;
  } catch (error) {
    console.error("Error fetching user by email: ", error);
    throw error;
  }
}

/**
 * Creates a user document at a specific id (typically the Firebase Auth uid).
 * Uses setDoc rather than addDoc since the id is provided, not generated.
 *
 * @param id - The user document id (Firebase Auth uid).
 * @param user - User data without an id.
 */
export async function createBuyer(id: string, buyer: Omit<Buyer, "id">): Promise<void> {
  try {
    await setDoc(doc(db, "buyers", id), buyer);
  } catch (error) {
    console.error("Error creating buyer: ", error);
    throw error;
  }
}

/**
 * Creates a user document at a specific id (typically the Firebase Auth uid).
 * Uses setDoc rather than addDoc since the id is provided, not generated.
 *
 * @param id - The user document id (Firebase Auth uid).
 * @param user - User data without an id.
 */
export async function createVendor(id: string, vendor: Omit<Vendor, "id">): Promise<void> {
  try {
    await setDoc(doc(db, "vendors", id), vendor);
  } catch (error) {
    console.error("Error creating vendor: ", error);
    throw error;
  }
}

/**
 * Creates a user document at a specific id (typically the Firebase Auth uid).
 * Uses setDoc rather than addDoc since the id is provided, not generated.
 *
 * @param id - The user document id (Firebase Auth uid).
 * @param user - User data without an id.
 */
export async function createAdmin(id: string, admin: Omit<Admin, "id">): Promise<void> {
  try {
    await setDoc(doc(db, "admins", id), admin);
  } catch (error) {
    console.error("Error creating admin: ", error);
    throw error;
  }
}

/**
 * Creates a user document at a specific id (typically the Firebase Auth uid).
 * Uses setDoc rather than addDoc since the id is provided, not generated.
 *
 * @param id - The user document id (Firebase Auth uid).
 * @param user - User data without an id.
 */
export async function createUser(id: string, user: Omit<User, "id">): Promise<void> {
  try {
    await setDoc(doc(db, "users", id), user);
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

/**
 * Updates fields on an existing user. Only the passed fields are changed;
 * everything else on the document is left as-is.
 * @param id - The user document id.
 * @param updates - Partial user fields to update (id excluded).
 */
export async function updateUser(
  id: string,
  updates: Partial<Omit<User, "id">>
): Promise<void> {
  try {
    await updateDoc(doc(db, "users", id), updates);
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
}

/**
 * Deletes a user document by id.
 * @param id - The user document id.
 */
export async function deleteUser(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
}

//  - - - - - - - - - - - - - - - - ADDRESSES  - - - - - - - - - - - - - - - - - 

/**
 * Creates a new address document in Firestore.
 * @param address - Address data without an id (Firestore generates it).
 * @returns The generated document id.
 */

export async function createAddress(discount: Omit<Address, "id">): Promise<string> {
  try {
    const docRef = await addDoc(addressRef, discount);
    return docRef.id;
  } catch (error) {
    console.error("Error adding address: ", error);
    throw error;
  }
}

/**
 * Updates fields on an existing address. Only the passed fields are changed;
 * everything else on the document is left as-is.
 * @param id - The address document id.
 * @param updates - Partial address fields to update (id excluded).
 */
export async function updateAddress(
  id: string,
  updates: Partial<Omit<Address, "id">>
): Promise<void> {
  try {
    await updateDoc(doc(db, "address", id), updates);
  } catch (error) {
    console.error("Error updating address: ", error);
    throw error;
  }
}

/**
 * Deletes an address document by id.
 * @param id - The address document id.
 */
export async function deleteAddress(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "address", id));
  } catch (error) {
    console.error("Error deleting address: ", error);
    throw error;
  }
}