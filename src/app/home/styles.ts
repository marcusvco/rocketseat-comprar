import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D0D2D8",
    paddingTop: 62,
  },
  logo: {
    width: 134,
    height: 34,
  },
  form: {
    gap: 7,
    width: "100%",
    marginTop: 42,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  header: {
    gap: 12,
    width: "100%",
    borderBottomColor: "#E4E6EC",
    borderBottomWidth: 1,
    paddingBottom: 12,
    flexDirection: "row",
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText: {
    color: "#828282",
    fontSize: 12,
    fontWeight: 600,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#EEF0F5",
    marginVertical: 16,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 62,
  },
  empty: {
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
  },
})
