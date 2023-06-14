import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 70,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },

  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "grey",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  container2: {
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 0,
    marginBottom: 100,
  },
  container3: {
    position: "absolute",
    zIndex: 1,
    bottom: -80,
    flex: 1,
    alignItems: "center",
    borderRadius: 75,
    justifyContent: "center",

    // backgroundColor: "lightskyblue",
  },

  imgback: {
    width: 160,
    height: 160,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  buttonsubmit: {
    // backgroundColor: "black",
    backgroundColor: "rgba(244, 244, 244, 1)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 8,
    width: 200,
  },
  inp: {
    padding: 8,
    margin: 8,
    width: 200,
  },
});
export default styles;
