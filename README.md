# react-native-reanimated-accordion
A simple animated expandable section for react native apps using reanimated

### 🦄 Features
- ✅  Customizable
- ✅  Includes option to not render collapsed compnent. (For less rendring).
- ✅  Uses Reanimated v4


### How it looks
<p align="center">
<img src="./assets/Simulator%20Screen%20Recording%20-%20iPhone%2017%20Pro%20-%202026-02-05%20at%2012.27.29.gif" width="280" alt="Accordion demo"/>
</p>

## Installation

```sh
npm install react-native-reanimated-animated-accordion
```
or using yarn
```sh
yarn add react-native-reanimated-animated-accordion
```

⚠️ Make sure you have [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) installed in your project.

## Version compatibility

| Version | React Native architecture |
|--------|----------------------------|
| 0.3.0  | Old architecture           |
| 0.4.0  | Old architecture           |
| 0.5.0+ | New architecture only     |

## Usage

```tsx
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Easing } from 'react-native-reanimated';
import Expandable from 'react-native-reanimated-animated-accordion';

export default function Example() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View
      style={{
        width: '80%',
        borderRadius: 20,
        backgroundColor: 'white',
        shadowOffset: { height: -2, width: 0 },
        elevation: 2,
        shadowRadius: 20,
        shadowOpacity: 0.07,
      }}
    >
      <TouchableOpacity style={{ padding: 20 }} onPress={() => setExpanded(!expanded)}>
        <Text>Toggle</Text>
      </TouchableOpacity>
      <View style={{ width: '100%' }}>
        <Expandable
          expanded={expanded}
          expandDuration={300}
          collapseDuration={300}
          renderWhenCollapsed={false}
          easing={Easing.out(Easing.cubic)}
        >
          <View style={{ width: '100%', padding: 20, paddingTop: 0 }}>
            <Text>Lorem ipsum dolor sit amet consectetur...</Text>
          </View>
        </Expandable>
      </View>
    </View>
  );
}
```


## Reduce Rendering
If you would like to prevent collapsed components from being rendered, add `renderWhenCollapsed={false}`. This can help if you have heavy collapsed components (e.g. reduces boot time and RAM).

```tsx
<Expandable
  expanded={expanded}
  expandDuration={300}
  collapseDuration={300}
  renderWhenCollapsed={false}
>
  {/* your content */}
</Expandable>
```


## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
