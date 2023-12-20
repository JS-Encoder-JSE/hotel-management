import React from "react";
import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../assets/logo.png"
import { getFormateDateAndTime } from "../../utils/utils";

const HotelSalesHistoryReport = ({ values, header,date }) => {
    // SL	Date	Items Name	Description	Quantity	Price	Action
    const desiredHeaders = ["Serial No", "date","today_hotel_income"];
    const tableHeaders = ["Serial No","Date","Today Hotel Income"]
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
           <Image src={logo} style={{
              width:"54px",
              height:"54px",
              marginBottom:"10px"
            }}/>
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
            {tableHeaders.map((header, index) => (
              <Text key={index} style={[styles.tableCell, styles.text]}>
                {header}
              </Text>
            ))}
          </View>
          {values?.map((item, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {desiredHeaders.map((key, cellIndex) => (
                <Text key={cellIndex} style={[styles.tableCell, styles.text]}>
                  {key === "Serial No"
                    ? rowIndex + 1
                    : key === "date"
                    ? date
                    ? new Date(date).toLocaleDateString()
                    : new Date(item[key]).toLocaleDateString() // Use the date prop here
                  : item[key]}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default HotelSalesHistoryReport;
