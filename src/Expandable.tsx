import React, { useEffect, useState, useTransition } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const DEFAULT_DURATION = 400;

type EasingFunction = (amount: number) => number;

const Expandable = ({
  expanded = false,
  duration = DEFAULT_DURATION,
  expandDuration,
  collapseDuration,
  renderWhenCollapsed = true,
  easing,
  children = <></>,
}: {
  expanded: boolean;
  renderWhenCollapsed?: boolean;
  easing?: EasingFunction;
  children: React.ReactNode;
  duration?: number;
  expandDuration?: number;
  collapseDuration?: number;
}) => {
  const animatedHeight = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [measured, setMeasured] = React.useState(false);
  const [_, startTransition] = useTransition(); // Prioritized update

  const [shouldRenderContent, setShouldRenderContent] = React.useState(
    expanded || renderWhenCollapsed
  );

  const getDurtation = () => {
    'worklet';

    if (animatedHeight.value === 0) {
      // will expand
      return expandDuration || duration;
    }
    return collapseDuration || duration;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(animatedHeight.value, {
      duration: getDurtation(),
      easing: easing || Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    opacity: withTiming(animatedHeight.value === 0 ? 0 : 1, {
      duration: getDurtation(),
      easing: easing || easing || Easing.bezier(0.25, 0.1, 0.25, 1),
    }),
    overflow: 'hidden',
  }));

  useEffect(() => {
    if (measured) {
      if (expanded) {
        startTransition(() => {
          setShouldRenderContent(true);
        });
        animatedHeight.value = contentHeight;
      } else {
        animatedHeight.value = 0;
      }
    }
  }, [contentHeight, expanded, measured, animatedHeight]);

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={{ position: 'absolute', width: '100%' }}
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          if (height !== contentHeight) {
            startTransition(() => {
              setContentHeight(height);
              if (!measured) {
                setMeasured(true);
                if (expanded) {
                  animatedHeight.value = height;
                }
              }
            });
          }
        }}
      >
        {shouldRenderContent && children}
      </View>
    </Animated.View>
  );
};

export default Expandable;
