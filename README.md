[![License](http://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://github.com/Malaa-tech/react-native-reanimated-animated-accordion)

# react-native-reanimated-animated-accordion
A simple animated expandable section for react native apps using reanimated

### 🦄 Features
- ✅  Customizable
- ✅  Includes option to not render collapsed compnent. (For less rendring).
- ✅  Uses Reanimated v3

## Installation

```sh
npm install react-native-reanimated-animated-accordion
```
or using yarn
```sh
yarn add react-native-reanimated-animated-accordion
```

⚠️ Make sure you have [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) installed in your project.


## Usage

```tsx | pure
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
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
