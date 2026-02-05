/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Easing, type EasingFunctionFactory } from 'react-native-reanimated';
import Expandable from 'react-native-reanimated-animated-accordion';

const testImage = require('../assets/icon.png');
const NumberField = (props: {
  value: number;
  setValue: (p: number) => void;
  title: string;
}) => (
  <View
    style={{
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <Text>{props.title}</Text>
    <Text style={{ marginStart: 10, fontWeight: '600' }}>{props.value}</Text>
    <TouchableOpacity
      onPress={() => {
        props.setValue(props.value + 100);
      }}
      style={{
        marginStart: 10,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
        borderRadius: 400,
      }}
    >
      <Text
        style={{
          fontWeight: '700',
        }}
      >
        +
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => {
        if (props.value <= 0) {
          return props.setValue(0);
        }
        props.setValue(props.value - 100);
      }}
      style={{
        marginStart: 10,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
        borderRadius: 400,
      }}
    >
      <Text
        style={{
          fontWeight: '700',
        }}
      >
        -
      </Text>
    </TouchableOpacity>
  </View>
);
export default function App() {
  const [expanded, setExpanded] = React.useState(false);
  const [expandSpeed, setExpandSpeed] = React.useState(300);
  const [collapseSpeed, setCollapseSpeed] = React.useState(300);
  const [selectedEasing, setSelectedEasing] = React.useState<number>(0);
  const easingOptions: { label: string; factory: EasingFunctionFactory }[] = [
    { label: 'Cubic out', factory: Easing.out(Easing.cubic) as unknown as EasingFunctionFactory },
    { label: 'Quad in/out', factory: Easing.inOut(Easing.quad) as unknown as EasingFunctionFactory },
    { label: 'Bezier', factory: Easing.bezier(0.25, 0.1, 0.25, 1.0) as unknown as EasingFunctionFactory },
    { label: 'Elastic', factory: Easing.elastic(1) as unknown as EasingFunctionFactory },
    { label: 'Bounce', factory: Easing.bounce as unknown as EasingFunctionFactory },
    { label: 'Exp in', factory: Easing.in(Easing.exp) as unknown as EasingFunctionFactory },
  ];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NumberField
        title="Expand speed"
        value={expandSpeed}
        setValue={setExpandSpeed}
      />
      <NumberField
        title="Collapse speed"
        value={collapseSpeed}
        setValue={setCollapseSpeed}
      />
      <View style={{ marginBottom: 20, width: '80%' }}>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>Easing</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {easingOptions.map((opt, i) => (
            <TouchableOpacity
              key={opt.label}
              onPress={() => setSelectedEasing(i)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: selectedEasing === i ? '#6366f1' : 'white',
                borderWidth: 1,
                borderColor: selectedEasing === i ? '#6366f1' : '#e5e7eb',
              }}
            >
              <Text
                style={{
                  fontWeight: selectedEasing === i ? '600' : '400',
                  color: selectedEasing === i ? 'white' : '#374151',
                }}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View
        style={{
          width: '80%',
          borderRadius: 20,
          backgroundColor: 'white',
          shadowOffset: {
            height: -2,
            width: 0,
          },
          elevation: 2,
          shadowRadius: 20,
          shadowOpacity: 0.07,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 20,
          }}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <Text>Toggle</Text>
        </TouchableOpacity>
        <View style={{ width: '100%' }}>
          <Expandable
            expandDuration={expandSpeed}
            collapseDuration={collapseSpeed}
            expanded={expanded}
            renderWhenCollapsed={false}
            easing={easingOptions[selectedEasing]?.factory}
          >
            <View style={{ width: '100%', padding: 20, paddingTop: 0 }}>
              <Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Necessitatibus ab placeat alias commodi voluptatibus possimus
                ducimus sit repellat praesentium fugit similique aut quam nemo
                libero, aperiam deleniti modi natus quia!
              </Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Necessitatibus ab placeat alias commodi voluptatibus possimus
                ducimus sit repellat praesentium fugit similique aut quam nemo
                libero, aperiam deleniti modi natus quia!
              </Text>

              <View
                style={{ marginTop: 20, width: '100%', alignItems: 'center' }}
              >
                <Image
                  source={testImage}
                  style={{ height: 100, width: 100, resizeMode: 'contain' }}
                />
              </View>
            </View>
          </Expandable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
