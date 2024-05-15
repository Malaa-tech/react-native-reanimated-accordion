/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { LegacyRef, useEffect } from 'react';
import { EasingFunction, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const DEFAULT_DURATION = 400;

const Expandable = ({
  expanded = false,
  duration = DEFAULT_DURATION,
  easing,
  renderWhenCollapsed = true,
  children = <></>,
}: {
  expanded?: boolean;
  duration?: number;
  renderWhenCollapsed?: boolean;
  easing?: EasingFunction | undefined;
  children: JSX.Element | JSX.Element[];
}) => {
  const reducedMotion = useReducedMotion();

  const [localIsExpanded, setLocalIsExpanded] = React.useState(false);
  const [isCollapsing, setIsCollapsing] = React.useState(false);
  const delay = renderWhenCollapsed ? 100 : 0;

  const heightSV = useSharedValue(0);
  const opacitySV = useSharedValue(0);
  const innerComponentHeightSV = useSharedValue(0);
  const innerComponentRef: LegacyRef<View> = useAnimatedRef();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightSV.value,
      opacity: opacitySV.value,
    };
  });

  useEffect(() => {
    if (expanded !== localIsExpanded) {
      if (expanded) {
        expand({ _duration: duration });
      } else {
        collapse({ _duration: duration });
      }
    }
  }, [expanded]);

  const expand = ({ _duration = DEFAULT_DURATION }) => {
    'worklet';

    runOnJS(setLocalIsExpanded)(true);
    opacitySV.value = withDelay(delay, withTiming(1, { duration }));
    heightSV.value = withDelay(
      delay,
      withTiming(
        innerComponentHeightSV.value,
        { duration: _duration, ...(easing ? { easing } : {}) },
        (finished) => {
          if (finished) {
            runOnJS(setLocalIsExpanded)(true);
          }
        }
      )
    );
  };

  const collapse = ({ _duration = DEFAULT_DURATION }) => {
    runOnJS(setLocalIsExpanded)(false);
    runOnJS(setIsCollapsing)(true);
    opacitySV.value = withDelay(delay, withTiming(0, { duration }));
    heightSV.value = withDelay(
      delay,
      withTiming(0, { duration: _duration }, (finished) => {
        if (finished) {
          runOnJS(setLocalIsExpanded)(false);
          runOnJS(setIsCollapsing)(false);
        }
      })
    );
  };

  const shouldRenderElement =
    renderWhenCollapsed || isCollapsing || localIsExpanded;

  useAnimatedReaction(
    () => {
      return {
        innerHeight: innerComponentHeightSV.value,
        expanded,
        localIsExpanded,
      };
    },
    (current, previous) => {
      // check when the inner component is rendered
      if (
        previous?.innerHeight === 0 &&
        current.innerHeight !== 0 &&
        expanded
      ) {
        expand({ _duration: duration });
      }
      if (
        current.innerHeight !== previous?.innerHeight &&
        current.localIsExpanded === previous?.localIsExpanded
      ) {
        if (current.localIsExpanded) {
          expand({ _duration: duration });
        }
      }
    },
    [innerComponentHeightSV, localIsExpanded, expanded]
  );

  if (reducedMotion) {
    return expanded ? children : null;
  }

  return (
    <Animated.View
      style={[
        {
          overflow: 'hidden',
          flexDirection: 'column',
        },
        animatedStyle,
      ]}
    >
      <View
        ref={innerComponentRef}
        style={{ width: '100%', position: 'absolute' }}
      >
        <View
          onLayout={(e) => {
            const { height } = e.nativeEvent.layout;
            if (height !== 0 && height !== innerComponentHeightSV.value) {
              innerComponentHeightSV.value = e.nativeEvent.layout.height;
            }
          }}
        >
          {shouldRenderElement ? children : <></>}
        </View>
      </View>
    </Animated.View>
  );
};

export default Expandable;
