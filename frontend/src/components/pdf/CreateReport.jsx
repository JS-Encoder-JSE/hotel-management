import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const CreateReport = ({ values, header }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
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
      fontSize: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            marginBottom: 15,
            alignItems: "center",
          }}
        >
          <View>
            <Text>{header?.title}</Text>
            <Text
              style={{
                marginHorizontal: "auto",
                marginTop: 5,
                fontSize: 12,
              }}
            >
              {header?.name}
            </Text>
            <Text
              style={{
                marginHorizontal: "auto",
                marginTop: 5,
                fontSize: 10,
              }}
            >
              Printed Date: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            {Object?.keys(values[0]).map((header, index) => (
              <Text key={index} style={[styles.tableCell, styles.text]}>
                {header}
              </Text>
            ))}
          </View>
          {values?.map((item, rowIndex) => (
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
