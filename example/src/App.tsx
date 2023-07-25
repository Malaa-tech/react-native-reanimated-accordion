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
import Expandable from 'react-native-reanimated-animated-accordion';

const testImage = require('../assets/icon.png');

export default function App() {
  const [expanded, setExpanded] = React.useState(false);
  const [speed, setSpeed] = React.useState(300);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text>Speed</Text>
        <Text style={{ marginStart: 10, fontWeight: '600' }}>{speed}</Text>
        <TouchableOpacity
          onPress={() => {
            setSpeed(speed + 100);
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
            if (speed <= 0) {
              return setSpeed(0);
            }
            setSpeed(speed - 100);
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
            duration={speed}
            renderWhenCollapsed={false}
            expanded={expanded}
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
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
