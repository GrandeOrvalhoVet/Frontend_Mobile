import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";

const { width } = Dimensions.get("window");

const DATA = [
  {
    Img: "https://cdn.leonardo.ai/users/172cd598-06ed-49cb-aa6e-b2f5e5dc62c7/generations/1638b11c-0fd4-4014-9f49-3c78e4a01821/DreamShaper_v7_GrandeOrvalhoveterinary_web_site_0.jpg",
  },
  {
    Img: "https://cdn.leonardo.ai/users/172cd598-06ed-49cb-aa6e-b2f5e5dc62c7/generations/0747d690-1fb4-429b-84ef-b19005b53419/DreamShaper_v7_GrandeOrvalhoveterinary_web_site_0.jpg?w=512",
  },
  {
    Img: "https://cdn.leonardo.ai/users/172cd598-06ed-49cb-aa6e-b2f5e5dc62c7/generations/0c516295-1ed2-4151-843a-0ac889a3d839/DreamShaper_v7_GrandeOrvalhoveterinary_0.jpg?w=512",
  },
];

const HomeCarousel = () => {
  const renderItem = (data) => (
    <View key={data.Img} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={{ uri: data.Img }} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={DATA}
        loop
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
    margin: 10,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    width: width,
    height: width * 0.5,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default HomeCarousel;
