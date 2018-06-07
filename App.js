
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
const {width, height} = Dimensions.get('window')
// import ECharts from './echarts'
// import OriEcharts from './native-echarts'
// import PickerViewExample from './antList'

const optionData = {
	"color": ["#ff7052", "#709bff", "#ffdf77"],
	"tooltip": {
		"trigger": "axis"
	},
	"grid": {
		"top": "15%",
		"left": "12%",
		"right": "12%"
	},
	"legend": {
		"data": ["销量", "均价"],
		"bottom": "5%"
	},
	"xAxis": [{
		"type": "category",
		"axisTick": {
			"alignWithLabel": true
		},
		"axisLabel": {
			"show": true
		},
		"data": ["20180505", "20180506", "20180507", "20180508", "20180509", "20180510", "20180511", "20180512", "20180513", "20180514"]
	}],
	"yAxis": [{
		"type": "value",
		"name": "销量",
		"nameTextStyle": {
			"fontSize": 14
		},
		"nameGap": 5,
		"min": 0,
		"max": "192",
		"position": "left",
		"axisLine": {
			"lineStyle": {
				"color": "#ff7052"
			}
		},
		"splitLine": {
			"show": false
		},
		"axisLabel": {
			"formatter": "{value}",
			"fontSize": 10
		}
	}, {
		"type": "value",
		"name": "均价",
		"nnameTextStyle": {
			"fontSize": 14
		},
		"nameGap": 5,
		"position": "right",
		"min": "7421",
		"max": "8016",
		"axisLine": {
			"lineStyle": {
				"color": "#709bff"
			}
		},
		"splitLine": {
			"show": false
		},
		"axisLabel": {
			"formatter": "{value}",
			"fontSize": 10
		}
	}],
	"series": [{
		"name": "销量",
		"type": "bar",
		"data": [0, 0, 142, 188, 135, 60, 64, 0, 0, 121]
	}, {
		"name": "均价",
		"type": "line",
		"yAxisIndex": 1,
		"data": [7572, 7572, 7601, 7636, 7859, 7700, 7700, 7700, 7700, 7700]
	}]
}
const App2 = () => {
  return (
    <View>
      <View style={{height: 100}}>
        <Text style={{height: 50,backgroundColor: 'red'}}>'lorem'</Text>
        <Text style={{height: 50,backgroundColor: 'red'}}>'lorem'</Text> 
      </View>
				{/* <ECharts width={width} height={200} option={optionData} onPressone={()=>{}}/> */}
				<Text>'hello'</Text>
    </View>
  )
}
export default App2