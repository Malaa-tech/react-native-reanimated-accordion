import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const DEFAULT_DURATION = 400;

type EasingFunction = (amount: number) => number;

const Expandable = ({
  expanded = false,
  duration = DEFAULT_DURATION,
  renderWhenCollapsed = true,
  easing,
  children = <></>,
}: {
  expanded: boolean;
  duration?: number;
  renderWhenCollapsed?: boolean;
  easing?: EasingFunction;
  children: React.ReactNode;
}) => {
  const animatedHeight = useSharedValue(0);
  const contentHeight = useRef(0);
  const [measured, setMeasured] = React.useState(false);
  const [shouldRenderContent, setShouldRenderContent] = React.useState(
    expanded || renderWhenCollapsed,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  const animate = (toValue: number, callback?: () => void) => {
    animatedHeight.value = withTiming(
      toValue,
      {
        duration,
        easing: easing || Easing.bezier(0.25, 0.1, 0.25, 1),
      },
      finished => {
        if (finished && callback) {
          runOnJS(callback)();
        }
      },
    );
  };

  useEffect(() => {
    if (measured) {
      if (expanded) {
        setShouldRenderContent(true);
        animate(contentHeight.current);
      } else {
        animate(0, () => {
          if (!renderWhenCollapsed) {
            setShouldRenderContent(false);
          }
        });
      }
    }
  }, [expanded, measured, duration, renderWhenCollapsed, easing]);

  return (
    <Animated.View style={animatedStyle}>
      {shouldRenderContent && (
        <View
          style={{ position: 'absolute', width: '100%' }}
          onLayout={event => {
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
