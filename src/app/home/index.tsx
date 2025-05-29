import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { styles } from "./styles"
import Button from "@/components/button"
import Input from "@/components/input"
import Filter from "@/components/filter"
import { FilterStatus } from "@/types/filter-status"
import Item from "@/components/item"
import { useEffect, useState } from "react"
import { itemsStorage, ItemStorage } from "@/storage/items"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING)
  const [description, setDescription] = useState<string>("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert(
        "Adicionar",
        "Informe a descrição do item para adicionar."
      )
    }

    const newItem = {
      id: String(new Date().getTime()),
      description,
      status: FilterStatus.PENDING,
    }

    setItems(await itemsStorage.add(newItem))
    Alert.alert("Adicionar", `Adicionado ${description}`)
    setDescription("")
    setFilter(FilterStatus.PENDING)
  }

  async function handleRemoveItem(id: string) {
    try {
      const updatedItems = await itemsStorage.remove(id)
      setItems(updatedItems)
    } catch (error) {
      console.log("REMOVE_ITEM: " + error)
      Alert.alert("Remover", "Não foi possível remover o item.")
    }
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id)
      await fetchItemsByStatus()
      Alert.alert("Alterar status", "Status do item alterado com sucesso.")
    } catch (error) {
      console.log("TOGGLE_ITEM_STATUS: ", error)
      Alert.alert(
        "Alterar status",
        "Não foi possível alterar o status do item."
      )
    }
  }

  function handleClearItems() {
    Alert.alert("Limpar", "Deseja limpar todos os itens?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Limpar", onPress: onClear },
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      console.log("CLEAR_ITEMS: ", error)
      Alert.alert("Limpar", "Não foi possível limpar os itens.")
    }
  }

  async function fetchItemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      console.log("FETCH_ITEMS: ", error)
      Alert.alert("Buscar itens", "Não foi possível carregar os itens.")
    }
  }

  useEffect(() => {
    fetchItemsByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input
          value={description}
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status == filter}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearItems}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={{ status: item.status, description: item.description }}
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui</Text>
          )}
        />
      </View>
    </View>
  )
}
