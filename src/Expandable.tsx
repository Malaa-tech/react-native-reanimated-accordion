import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const DEFAULT_DURATION = 400;

type EasingFunction = (amount: number) => number;

const Expandable = ({
  expanded = false,
  expandDelay = DEFAULT_DURATION,
  collapseDelay = DEFAULT_DURATION,
  renderWhenCollapsed = true,
  easing,
  children = <></>,
}: {
  expanded: boolean;
  renderWhenCollapsed?: boolean;
  easing?: EasingFunction;
  children: React.ReactNode;
  expandDelay?: number;
  collapseDelay?: number;
}) => {
  const animatedHeight = useSharedValue(0);
  const contentHeight = useRef(0);
  const [measured, setMeasured] = React.useState(false);
  const [shouldRenderContent, setShouldRenderContent] = React.useState(
    expanded || renderWhenCollapsed
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: interpolate(
      animatedHeight.value,
      [0, contentHeight.current],
      [0, 1]
    ),
    overflow: 'hidden',
  }));

  const animate = useCallback(
    (duration: number, toValue: number, callback?: () => void) => {
      animatedHeight.value = withTiming(
        toValue,
        {
          duration,
          easing: easing || Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        (finished) => {
          if (finished && callback) {
            runOnJS(callback)();
          }
        }
      );
    },
    [animatedHeight, easing]
  );
  useEffect(() => {
    if (measured) {
      if (expanded) {
        setShouldRenderContent(true);
        animate(expandDelay, contentHeight.current);
      } else {
        animate(collapseDelay, 0, () => {
          if (!renderWhenCollapsed) {
            setShouldRenderContent(false);
          }
        });
      }
    }
  }, [
    expanded,
    measured,
    expandDelay,
    collapseDelay,
    renderWhenCollapsed,
    easing,
    animate,
  ]);

  return (
    <Animated.View style={animatedStyle}>
      {shouldRenderContent && (
        <View
          style={{ position: 'absolute', width: '100%' }}
          onLayout={(event) => {
            const height = event.nativeEvent.layout.height;
            if (height !== contentHeight.current) {
              contentHeight.current = height;
              if (!measured) {
                setMeasured(true);
                if (expanded) {
                  animatedHeight.value = height;
                }
              }
            }
          }}
        >
          {children}
        </View>
      )}
    </Animated.View>
  );
};

export default Expandable;
