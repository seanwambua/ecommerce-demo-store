import { db } from "../../../firebase";
import {
  type Brand,
  type Category,
  type Discount,
  type Product,
  type ProductImage,
} from "../types";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// Firestore References
const productsRef = collection(db, "products");
const discountsRef = collection(db, "discounts");
const brandsRef = collection(db, "brands");
const categoriesRef = collection(db, "categories");
const productImagesRef = collection(db, "images");

//  - - - - - - - - - - - - - - - - PRODUCTS  - - - - - - - - - - - - - - - - - - - - -

/**
 * Fetches all products from the collection.
 *
 * @returns All products currently in Firestore.
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
}

/**
 * Fetches a single product by id.
 * @param id - The product document id.
 * @returns The product, or null if no document exists with that id.
 */
export async function getProductById(id: string ): Promise<Product | null> {
  try {
    const snapshot = await getDoc(doc(db, "products", id));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Product;
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw error;
  }
}

/**
 * Fetches a single product by id.
 * @param name - The product document name.
 * @returns The product, or null if no document exists with that id.
 */
export async function getProductByName(name: string): Promise<Product | null> {
  try {
    const snapshot = await getDoc(doc(db, "products", name));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Product;
  } catch (error) {
    console.error("Error fetching product: ", error);
    throw error;
  }
}

/**
 * Searches products whose name starts with the given prefix (case-insensitive).
 * Requires a `keywords` field on each product doc.
 * @function array-contains - Used to search multiple product documents for the serach keywords.
 * @param keyword - The text to search for.
 * @returns Matching products.
 */

export async function searchProductsByKeywords(
  keyword: string,
): Promise<Product[]> {
  try {
    const term = keyword.toLowerCase();

    const q = query(productsRef, where("keywords", "array-contains", term));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error searching products: ", error);
    throw error;
  }
}

/**
 * Creates a new product document in Firestore.
 * @param product - Product data without an id (Firestore generates it).
 * @returns The generated document id.
 */

export async function createProduct(
  product: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  try {
    const newProduct = {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(productsRef, newProduct);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
}

/**
 * Updates fields on an existing product. Only the passed fields are changed;
 * everything else on the document is left as-is.
 * @param id - The product document id.
 * @param updates - Partial product fields to update (id excluded).
 */
export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id">>,
): Promise<void> {
  try {
    await updateDoc(doc(db, "products", id), updates);
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
}

/**
 * Deletes a product document by id.
 * @param id - The product document id.
 */
export async function deleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
}

//  - - - - - - - - - - - - - - - - PRODUCT IMAGE  - - - - - - - - - - - - - - - - -

/**
 * Fetches a product image object by id.
 * @param name - The product image document name.
 * @returns The product image object, or null if no document exists with that id.
 */
export async function getProductImageObjById(
  id: string,
): Promise<ProductImage | null> {
  try {
    const snapshot = await getDoc(doc(db, "images", id));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as ProductImage;
  } catch (error) {
    console.error("Error fetching image object: ", error);
    throw error;
  }
}

/**
 * Creates a new product image object document in Firestore.
 * @param product image object - Product Image data without an id (Firestore generates it).
 * @returns The generated document id.
 */

export async function createProductImageObj(
  productImageObj: Omit<ProductImage, "id">,
): Promise<string> {
  try {
    const docRef = await addDoc(productImagesRef, productImageObj);
    return docRef.id;
  } catch (error) {
    console.error("Error creating product image object: ", error);
    throw error;
  }
}

/**
 * Updates fields of an existing product image object. Only the passed fields are changed;
 * everything else on the document is left as-is.
 * @param id - The product image document id.
 * @param updates - Partial product image fields to update (id excluded).
 */
export async function updateProductImageObj(
  id: string,
  updates: Partial<Omit<ProductImage, "id">>,
): Promise<void> {
  try {
    await updateDoc(doc(db, "images", id), updates);
  } catch (error) {
    console.error("Error updating product image object: ", error);
    throw error;
  }
}

/**
 * Deletes a product image object document by id.
 * @param id - The product image object document id.
 */
export async function deleteProductImageObj(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "images", id));
  } catch (error) {
    console.error("Error deleting product image object: ", error);
    throw error;
  }
}

//  - - - - - - - - - - - - - - - - BRAND  - - - - - - - - - - - - - - - - - - - - -

/**
 * Fetches a single brand by id.
 * @param name - The brand document name.
 * @returns The brand, or null if no document exists with that id.
 */
export async function getBrandById(id: string): Promise<Brand | null> {
  try {
    const snapshot = await getDoc(doc(db, "brands", id));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Brand;
  } catch (error) {
    console.error("Error fetching brand: ", error);
    throw error;
  }
}

/**
 * Fetches a single brand by id.
 * @param name - The brand document name.
 * @returns The brand, or null if no document exists with that id.
 */
export async function getBrandByName(name: string): Promise<Brand | null> {
  try {
    const snapshot = await getDoc(doc(db, "brands", name));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Brand;
  } catch (error) {
    console.error("Error fetching brand: ", error);
    throw error;
  }
}

/**
 * Creates a new brand document in Firestore.
 * @param brand - Brand data without an id (Firestore generates it).
 * @returns The generated document id.
 */

export async function createBrand(brand: Omit<Brand, "id">): Promise<string> {
  try {
    const docRef = await addDoc(brandsRef, brand);
    return docRef.id;
  } catch (error) {
    console.error("Error adding brand: ", error);
    throw error;
  }
}

/**
 * Updates fields on an existing brand. Only the passed fields are changed;
 * everything else on the document is left as-is.
 * @param id - The brand document id.
 * @param updates - Partial brand fields to update (id excluded).
 */
export async function updateBrand(
  id: string,
  updates: Partial<Omit<Brand, "id">>,
): Promise<void> {
  try {
    await updateDoc(doc(db, "brands", id), updates);
  } catch (error) {
    console.error("Error updating brand: ", error);
    throw error;
  }
}

/**
 * Deletes a brand document by id.
 * @param id - The brand document id.
 */
export async function deleteBrand(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "brands", id));
  } catch (error) {
    console.error("Error deleting brand: ", error);
    throw error;
  }
}

//  - - - - - - - - - - - - - - - - CATEGORIES  - - - - - - - - - - - - - - - - - - - - -

/**
 * Fetches a single brand by id.
 * @param name - The brand document name.
 * @returns The brand, or null if no document exists with that id.
 */
export async function getCategoryById(id: string): Promise<Brand | null> {
  try {
    const snapshot = await getDoc(doc(db, "categories", id));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Brand;
  } catch (error) {
    console.error("Error fetching brand: ", error);
    throw error;
  }
}

/**
 * Fetches a single brand by id.
 * @param name - The brand document name.
 * @returns The brand, or null if no document exists with that id.
 */
export async function getCategoryByName(name: string): Promise<Brand | null> {
  try {
    const snapshot = await getDoc(doc(db, "categories", name));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Brand;
  } catch (error) {
    console.error("Error fetching brand: ", error);
    throw error;
  }
}

/**
 * Creates a new brand document in Firestore.
 * @param brand - Brand data without an id (Firestore generates it).
 * @returns The generated document id.
 */

export async function createCategory(
  category: Omit<Category, "id">,
): Promise<string> {
  try {
    const docRef = await addDoc(categoriesRef, category);
    return docRef.id;
  } catch (error) {
    console.error("Error adding category: ", error);
    throw error;
  }
}

/**
 * Updates fields on an existing category. Only the passed fields are changed;
 * everything else on the document is left as-is.
 * @param id - The category document id.
 * @param updates - Partial category fields to update (id excluded).
 */
export async function updateCategory(
  id: string,
  updates: Partial<Omit<Category, "id">>,
): Promise<void> {
  try {
    await updateDoc(doc(db, "categories", id), updates);
  } catch (error) {
    console.error("Error updating category: ", error);
    throw error;
  }
}

/**
 * Deletes a category document by id.
 * @param id - The category document id.
 */
export async function deleteCategory(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "categories", id));
  } catch (error) {
    console.error("Error deleting category: ", error);
    throw error;
  }
}

//  - - - - - - - - - - - - - - - - DISCOUNTS  - - - - - - - - - - - - - - - - - - - - -

/**
 * Fetches a single discount by id.
 * @param name - The discount document name.
 * @returns The discount, or null if no document exists with that id.
 */
export async function getDiscountById(id: string): Promise<Discount | null> {
  try {
    const snapshot = await getDoc(doc(db, "discounts", id));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Discount;
  } catch (error) {
    console.error("Error fetching discount: ", error);
    throw error;
  }
}

/**
 * Fetches a single discount by code.
 * @param name - The discount document name.
 * @returns The discount, or null if no document exists with that code.
 */
export async function getDiscountByCode(
  code: string,
): Promise<Discount | null> {
  try {
    const snapshot = await getDoc(doc(db, "discounts", code));
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as Discount;
  } catch (error) {
    console.error("Error fetching discount: ", error);
    throw error;
  }
}

/**
 * Creates a new discount document in Firestore.
 * @param discount - Discount data without an id (Firestore generates it).
 * @returns The generated document id.
 */

export async function createDiscount(
  discount: Omit<Discount, "id">,
): Promise<string> {
  try {
    const docRef = await addDoc(discountsRef, discount);
    return docRef.id;
  } catch (error) {
    console.error("Error adding discount: ", error);
    throw error;
  }
}

/**
 * Updates fields on an existing discount. Only the passed fields are changed;
 * everything else on the document is left as-is.
 * @param id - The discount document id.
 * @param updates - Partial discount fields to update (id excluded).
 */
export async function updateDiscount(
  id: string,
  updates: Partial<Omit<Discount, "id">>,
): Promise<void> {
  try {
    await updateDoc(doc(db, "discounts", id), updates);
  } catch (error) {
    console.error("Error updating discount: ", error);
    throw error;
  }
}

/**
 * Deletes a discount document by id.
 * @param id - The discount document id.
 */
export async function deleteDiscount(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "discounts", id));
  } catch (error) {
    console.error("Error deleting discount: ", error);
    throw error;
  }
}
