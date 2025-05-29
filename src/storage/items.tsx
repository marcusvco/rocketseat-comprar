import { FilterStatus } from "@/types/filter-status"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ITEMS_STORAGE_KEY = "@comprar:items"

export type ItemStorage = {
  id: string
  description: string
  status: FilterStatus
}

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
    return storage ? JSON.parse(storage) : []
  } catch (error) {
    throw new Error("GET_ITEMS: " + error)
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  const items = await get()
  return items.filter((item) => item.status === status)
}

async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error)
  }
}

async function add(item: ItemStorage): Promise<ItemStorage[]> {
  const items = await get()
  items.push(item)
  await save(items)
  return items
}

async function remove(id: string): Promise<ItemStorage[]> {
  const items = await get()
  const updatedItems = items.filter((item) => item.id !== id)
  await save(updatedItems)
  return updatedItems
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
  } catch (error) {
    throw new Error("CLEAR_ITEMS: " + error)
  }
}

async function toggleStatus(id: string): Promise<void> {
  const items = await get()
  const updatedItems = items.map((item) =>
    item.id === id
      ? {
          ...item,
          status:
            item.status === FilterStatus.PENDING
              ? FilterStatus.DONE
              : FilterStatus.PENDING,
        }
      : item
  )
  await save(updatedItems)
}

export const itemsStorage = {
  add,
  get,
  clear,
  remove,
  getByStatus,
  toggleStatus,
}
