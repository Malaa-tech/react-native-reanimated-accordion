# react-native-reanimated-accordion
A simple animated expandable section for react native apps using reanimated

### 🦄 Features
- ✅  Customizable
- ✅  Includes option to not render collapsed compnent. (For less rendring).
- ✅  Uses Reanimated v3


### How we use it
<p align="center">
<img src="https://github.com/Malaa-tech/react-native-reanimated-accordion/assets/24798045/3ab1463f-f200-4f41-943f-7ea74ad20adf" width="270"/>
<img src="https://github.com/Malaa-tech/react-native-reanimated-accordion/assets/24798045/e613f0f0-261c-448b-b8b3-4f9f428302a8" width="270"/>
<img src="https://github.com/Malaa-tech/react-native-reanimated-accordion/assets/24798045/3cc703f3-e674-41e0-9489-dae80dd28d52" width="270"/>
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
