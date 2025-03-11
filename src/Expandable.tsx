import React, {
	MutableRefObject,
	useState,
	useImperativeHandle,
	forwardRef,
	useCallback,
} from "react";
import { LayoutChangeEvent, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	Easing,
	interpolate,
	useDerivedValue,
} from "react-native-reanimated";

const DEFAULT_DURATION = 400;
type EasingFunction = (amount: number) => number;

export type ExpandableRef = {
	expand: () => void;
	collapse: () => void;
	toggle: () => void;
	isExpanded: () => boolean;
};

const Expandable = forwardRef<
	ExpandableRef,
	{
		expanded?: boolean;
		expandedRef?: MutableRefObject<boolean>;
		renderWhenCollapsed?: boolean;
		easing?: EasingFunction;
		children: React.ReactNode;
		duration?: number;
		expandDuration?: number;
		collapseDuration?: number;
	}
>(
	(
		{
			expanded = false,
			duration = DEFAULT_DURATION,
			expandedRef,
			easing,
			children = <></>,
			renderWhenCollapsed = false,
		},
		ref,
	) => {
		const isExpanded = useSharedValue(expanded);
		const [isMeasured, setIsMeasured] = useState(false);
		const contentHeight = useSharedValue(0);

		const onLayout = useCallback(
			(event: LayoutChangeEvent) => {
				const height = event.nativeEvent.layout.height;
				if (height > 0 && contentHeight.value !== height) {
					contentHeight.value = height;
					if (!isMeasured) {
						setIsMeasured(true);
					}
				}
			},
			[contentHeight, isMeasured],
		);

		const progress = useDerivedValue(() => {
			if (!isMeasured) return isExpanded.value ? 1 : 0;

			return withTiming(isExpanded.value ? 1 : 0, {
				duration,
				easing: easing || Easing.bezier(0.25, 0.1, 0.25, 1),
			});
		}, [isMeasured, duration]);

		useImperativeHandle(
			ref,
			() => ({
				expand: () => {
					isExpanded.value = true;
					if (expandedRef) expandedRef.current = true;
				},
				collapse: () => {
					isExpanded.value = false;
					if (expandedRef) expandedRef.current = false;
				},
				toggle: () => {
					isExpanded.value = !isExpanded.value;
					if (expandedRef) expandedRef.current = isExpanded.value;
				},
				isExpanded: () => isExpanded.value,
			}),
			[isExpanded, expandedRef],
		);

		const animatedStyle = useAnimatedStyle(() => {
			const height = interpolate(
				progress.value,
				[0, 1],
				[0, contentHeight.value],
			);

			return {
				height,
				opacity: interpolate(
					progress.value,
					[0, 1],
					[renderWhenCollapsed ? 0.3 : 0, 1],
				),
				overflow: "hidden",
			};
		});

		return (
			<Animated.View style={animatedStyle}>
				<View
					style={{ position: "absolute", width: "100%" }}
					onLayout={onLayout}
				>
					{children}
				</View>
			</Animated.View>
		);
	},
);

export default Expandable;
