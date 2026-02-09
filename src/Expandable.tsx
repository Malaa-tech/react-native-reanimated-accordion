import type { PropsWithChildren } from 'react';
import Animated, {
  measure,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  Easing,
  type EasingFunctionFactory,
  type SharedValue,
  type EasingFunction,
} from 'react-native-reanimated';
import { scheduleOnUI } from 'react-native-worklets';

const DEFAULT_DURATION = 400;

type ExpandableProps = {
  expanded: boolean;
  renderWhenCollapsed?: boolean;
  easing?: EasingFunction | EasingFunctionFactory;
  duration?: number;
  expandDuration?: number;
  collapseDuration?: number;
};

const setMeasuredHeight = (
  measuredHeight: SharedValue<number>,
  height: number
) => {
  'worklet';
  measuredHeight.value = height;
};

const Expandable = ({
  expanded = false,
  duration = DEFAULT_DURATION,
  expandDuration,
  collapseDuration,
  renderWhenCollapsed = true,
  easing,
  children,
}: PropsWithChildren<ExpandableProps>) => {
  const contentRef = useAnimatedRef<Animated.View>();
  const measuredHeight = useSharedValue(0);
  const expandedValue = useDerivedValue(() => (expanded ? 1 : 0), [expanded]);

  const measureContent = () => {
    'worklet';
    const measured = measure(contentRef);
    if (measured && measured.height > 0) {
      setMeasuredHeight(measuredHeight, measured.height);
    }
  };

  useAnimatedReaction(
    () => expandedValue.value,
    (current, previous) => {
      if (current === 1 && previous !== 1) {
        measureContent();
      }
    },
    []
  );

  const animatedStyle = useAnimatedStyle(() => {
    const isExpanding = expandedValue.value === 1;
    const targetHeight = isExpanding ? measuredHeight.value : 0;
    const animDuration = isExpanding
      ? expandDuration ?? duration
      : collapseDuration ?? duration;
    const animEasing = easing ?? Easing.out(Easing.cubic);
    return {
      height: withTiming(targetHeight, {
        duration: animDuration,
        easing: animEasing,
      }),
      opacity: withTiming(expandedValue.value, {
        duration: animDuration,
        easing: animEasing,
      }),
      overflow: 'hidden',
    };
  }, [duration, expandDuration, collapseDuration, easing]);

  return (
    <Animated.View style={animatedStyle}>
      <Animated.View
        ref={contentRef}
        onLayout={() => {
          if (measuredHeight.value === 0) {
            scheduleOnUI(measureContent);
          }
        }}
        style={{ position: 'absolute', width: '100%' }}
      >
        {(expanded || renderWhenCollapsed) && children}
      </Animated.View>
    </Animated.View>
  );
};

export default Expandable;
