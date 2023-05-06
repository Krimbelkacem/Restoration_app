import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";

const swiperData = [
  {
    id: 1,
    title: "Select a component",
    imageSrc: "https://manual-ui.com/images/undraw-selecting.png",
  },
  {
    id: 2,
    title: "Customize",
    imageSrc: "https://manual-ui.com/images/undraw-options.png",
  },
  {
    id: 3,
    title: "Copy the source code and use it",
    imageSrc: "https://manual-ui.com/images/undraw-proud-coder.png",
  },
];

const UISwiper = ({ children, onSlideChange }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [slide, setSlide] = useState(0);
  const initialRender = useRef(true);
  const scrollRef = useRef();

  const numberOfChildren = React.Children.count(children);
  const maxStep = numberOfChildren - 1;

  const styles = {
    flex: {
      flex: 1,
    },
    swiperItem: {
      width: screenWidth,
      height: screenHeight,
    },
    swiperOverlayActions: {
      position: "absolute",
      bottom: 60,
      left: 0,
      right: 0,
    },
    swiperDots: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    swiperDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: "#00000022",
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    swiperDotIsActive: {
      backgroundColor: "#299cd1",
    },
    swiperControls: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
      paddingHorizontal: 24,
    },
    btnA: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 46,
      minWidth: 100,
      maxWidth: "100%",
      paddingHorizontal: 20,
      backgroundColor: "#299cd1",
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#299cd1",
      overflow: "hidden",
    },
    btnTextA: {
      color: "#ffffff",
      fontSize: 20,
    },
    btnB: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 46,
      maxWidth: "100%",
      paddingHorizontal: 20,
      backgroundColor: "#299cd1",
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#299cd1",
      overflow: "hidden",
    },
    btnBIcon: {
      flexShrink: 0,
      width: 20,
      height: 20,
      tintColor: "#ffffff",
    },
    btnCWrapper: {
      marginRight: "auto",
    },
    btnC: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 46,
      maxWidth: "100%",
      paddingHorizontal: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#1c1c1c",
      overflow: "hidden",
    },
    btnTextC: {
      color: "#1c1c1c",
      fontSize: 20,
    },
  };

  const scrollToStep = (toStep) => {
    // setTimeout because this doesn't work well if we have multiple useWindowDimensions per screen and we run this
    // method in useEffect where dependencies are screen width and height (if we support landscape mode for example)
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: toStep * screenWidth });
    }, 0);
  };

  const handleOnPressNext = () => {
    if (slide !== maxStep) {
      scrollToStep(slide + 1);
    }
  };

  useEffect(() => {
    initialRender.current = false;
    if (!initialRender.current) {
      scrollToStep(slide);
    }
  }, [screenWidth, screenHeight]);

  return (
    <View style={styles.flex}>
      <ScrollView
        ref={scrollRef}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const activeSlide = Math.round(offsetX / screenWidth);
          if (
            activeSlide >= 0 &&
            activeSlide <= maxStep &&
            activeSlide !== slide
          ) {
            setSlide(activeSlide);
            onSlideChange?.(activeSlide);
          }
        }}
        scrollEventThrottle={16}
      >
        {React.Children.map(children, (child) => {
          return (
            <View style={styles.swiperItem}>{React.cloneElement(child)}</View>
          );
        })}
      </ScrollView>
      <View style={styles.swiperOverlayActions} pointerEvents="box-none">
        <View style={styles.swiperDots} pointerEvents="box-none">
          {React.Children.map(children, (_, index) => {
            const isActiveSlide = slide === index;
            return (
              <TouchableOpacity
                style={[
                  styles.swiperDot,
                  isActiveSlide && styles.swiperDotIsActive,
                ]}
                onPress={() => {
                  scrollToStep(index);
                }}
                activeOpacity={0.8}
              />
            );
          })}
        </View>
        <View style={styles.swiperControls} pointerEvents="box-none">
          {slide !== maxStep ? (
            <>
              <View style={styles.btnCWrapper}>
                <TouchableOpacity style={styles.btnC} activeOpacity={0.8}>
                  <Text style={styles.btnTextC} numberOfLines={1}>
                    Skip
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btnB}
                onPress={handleOnPressNext}
                activeOpacity={0.8}
              >
                <Image
                  style={styles.btnBIcon}
                  source={{
                    uri: "https://manual-ui.com/images/chevron-right.png",
                  }}
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.btnA}
              onPress={handleOnPressNext}
              activeOpacity={0.8}
            >
              <Text style={styles.btnTextA} numberOfLines={1}>
                Get Started
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const UIOnboarding = () => {
  const { height: screenHeight } = useWindowDimensions();

  const styles = {
    flex: {
      flex: 1,
    },
    onboadring: {
      height: "100%",
    },
    onboardingContent: {
      flexGrow: 1,
      paddingBottom: 180,
    },
    onboardingImage: {
      width: "100%",
      height: screenHeight * 0.5,
      minHeight: 300,
    },
    onboardingMain: {
      padding: 24,
    },
    onboardingText: {
      textAlign: "center",
      fontSize: 30,
    },
  };

  return (
    <View style={styles.flex}>
      <UISwiper>
        {swiperData.map(({ id, title, imageSrc }) => (
          <ScrollView
            key={id}
            style={styles.onboadring}
            contentContainerStyle={styles.onboardingContent}
          >
            <Image
              style={styles.onboardingImage}
              source={{
                uri: imageSrc,
              }}
              resizeMode="contain"
            />
            <View style={styles.onboardingMain}>
              <Text style={styles.onboardingText}>{title}</Text>
            </View>
          </ScrollView>
        ))}
      </UISwiper>
    </View>
  );
};

export default UIOnboarding;
