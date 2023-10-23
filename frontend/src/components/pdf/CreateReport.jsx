import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const data = [
  { Name: "John", Age: 28, Email: "john@example.com" },
  { Name: "Alice", Age: 32, Email: "alice@example.com" },
  { Name: "Bob", Age: 45, Email: "bob@example.com" },
];

const CreateReport = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white",
      padding: 20,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#e8e8e8",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#e8e8e8",
    },
    tableCell: {
      flex: 1,
      padding: 8,
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
    },
    text: {
      fontSize: 12,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            {Object.keys(data[0]).map((header, index) => (
              <Text key={index} style={[styles.tableCell, styles.text]}>
                {header}
              </Text>
            ))}
          </View>
          {data.map((item, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {Object.values(item).map((cell, cellIndex) => (
                <Text key={cellIndex} style={[styles.tableCell, styles.text]}>
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CreateReport;
