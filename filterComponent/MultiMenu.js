import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker , List, Button } from 'antd-mobile';


const seasons = [
  {
    value: 'value1',
    label: 'value1',
    children: [
      {value: 'value11',label: 'value11'},
      {value: 'value12',label: 'value12'}
    ]
  },
  {
    value: 'value2',
    label: 'value2',
    children: [
     {value: 'value111111111111121',label: 'value111111111111121'},
     {value: 'value22',label: 'value23'}
    ]
  }
];
const data = [
  {
    value: '1',
    label: 'Food',
  }, {
    value: '2',
    label: 'Supermarket',
  },
  {
    value: '3',
    label: 'Extra',
  },
];

export default class MultiMenu extends React.Component {
  state = {
    value: null,
  };
  onChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  }
  onScrollChange = (value) => {
    console.log(value);
  }
  render() {
    return (
      <View>
        
        <Text>1234</Text>
        <Picker
          onChange={this.onChange}
          onScrollChange={this.onScrollChange}
          data={seasons}
          cols={2}
          >
          <List.Item arrow="horizontal">指标 & 维度</List.Item>
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    multiFoomenu: {
        
        width: '200'
    }

})