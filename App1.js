
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated
} from 'react-native';

const scrollWidth = 1000
const {width, height} = Dimensions.get('window')
const AniFlat = Animated.createAnimatedComponent(FlatList)
//将要从props获取的数据
const colnameList = ['油品分类', '油品分类', '油库', '油品分类', '油品分类']
const flatData = [[21.8,17.57,-0.6,"81%"],[10.8,9.43,0.43,"87%"],[5.55,4.12,-0.5,"74%"],[3.7,2.88,-0.2,"78%"],[0.7,0.72,0.13,"103%"],[0.6,0.81,0.31,"135%"],[0.25,0.1,-0.11,"40%"],[0,0,0,"0%"],[11,7.53,-1.64,"69%"],[0,0,0,"0%"],[11,7.53,-1.64,"69%"],[0,0,0,"0%"],[0,0.61,0.61,"0%"]]
const columnItems = ['计划', '完成', '超欠', '完成率']
let rowItems =['合计', '汽油', '92#高清', '92#组分', '95#高清', '95#组分', '98#高清', '98#组分', '柴油', '0#普柴', '0#车柴', '-10#车柴', '燃料乙醇']

/**
 * TODO
 * 把列名和数据 为一个数组
 * 左侧title为一个数组
 */

// 定义基础尺寸
const 
  trheadWidth = 110, // 表格行第一列宽
  thHeight = 40,     // 表格头部 高度
  trHeight = 36,     // 表格行高
  // 数据单元格宽度，小于三列的不滑动
  minTDWidth = (width - trheadWidth) / columnItems.length ,//定义td最小宽度，占满整个屏幕宽度!!!!!!
  tdWidth = minTDWidth > 100 ? minTDWidth : 100,     // 表格行宽
  rightWidth = tdWidth * columnItems.length // !!!!!!

// 定义样式
const tdBorderWidth = 1
const tdBorderColor = '#ddd'
const tdTextColor = '#333'
const tdBGC = '#fff'
const thCommonStyle={
  // width: tdWidth,
  lineHeight: thHeight,
  fontWeight: 'bold',
  color: '#444',
  backgroundColor: 'rgb(235,235,235)',
  textAlign: 'center',
}
// 定义特殊样式


class RightTitle extends Component {
  render() {
    return (
      <View style={newStyle.rightHead}>
        {columnItems.map( (item, index) => <View style={newStyle.rightHeadView} key={index}><Text style={{...thCommonStyle}}>{item}</Text></View> )}
      </View>
    )
  }
}

class LeftTitle extends Component {
  render() {
    return (
      <View style={newStyle.leftHead}><Text style={{...thCommonStyle}}> 'blabla'</Text></View>
    )
  }
}

/**
 * 外部属性props
 * width 
 * height
 * 最后弄data数据格式
 * 内部定义的属性
 * 
 */
class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue:  new Animated.Value(0),
      leftY: new Animated.Value(0),
      rightY: new Animated.Value(0),
    }
  }

  _renderDataItem = ({item, index})=>  (
    <View style={newStyle.rightRow}>
      <View style={newStyle.rightItemView}><Text style={newStyle.rightItemText}>{item[0]}</Text></View>
      <View style={newStyle.rightItemView}><Text style={newStyle.rightItemText}>{item[1]}</Text></View>
      {item[2]!== undefined && <View style={newStyle.rightItemView}><Text style={newStyle.rightItemText}>{item[2]}</Text></View>}
      {item[3]!== undefined && <View style={newStyle.rightItemView}><Text style={newStyle.rightItemText}>{item[3]}</Text></View>}
    </View>
  )

  _keyExtractor = (item, index) => index.toString();

  _renderLeftItem = ({item}) => (
    <View style={newStyle.leftItemView}>
      <Text style={newStyle.leftItemText}>{item}</Text>
    </View>
  )
  render() {

    const {width, height}=  this.props
    
    const listHeight = trHeight * rowItems.length
    let scrollX = this.state.xValue.interpolate({
      inputRange: [0,scrollWidth],
      outputRange: [0,scrollWidth],
    })
    let leftY = this.state.leftY.interpolate({
      inputRange: [0,listHeight],
      outputRange: [0,-listHeight],
      extrapolate: 'clamp'
    })
    let rightY = this.state.rightY.interpolate({
      inputRange: [0,listHeight],
      outputRange: [0,-listHeight],
      extrapolate: 'clamp'
    })

    return (
      <View style={{width: width, height: height, flexDirection: 'row'}}>
        <View style={newStyle.tableLeft}>
          <LeftTitle />
          <View style={{flex:1}}>
            <Animated.ScrollView
              contentContainerStyle={{minHeight: 400}}
              showsVerticalScrollIndicator={false}              
              scrollEventThrottle={1}
              bounces={false}
              scrollEnabled={false}
            >
              <AniFlat
                style={{transform: [{translateY: leftY}]}}                  
                showsVerticalScrollIndicator={false}
                bounces={false}
                data={rowItems}
                // extraData={this.state.rightY}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderLeftItem}
              />
            </Animated.ScrollView>                
          </View>
        </View>
        <Animated.ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.state.xValue}}}],
            {useNativeDriver: true}
          )}
          scrollEventThrottle={16}
          bounces={false}
          
          >
          <View style={newStyle.tableRight}>
            <RightTitle />
            {/* 右侧list */}
              <Animated.ScrollView
                contentContainerStyle={{minHeight: 400, backgroundColor: '#3df'}}
                showsVerticalScrollIndicator={false}              
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: this.state.leftY}}}],
                  {useNativeDriver: true}
                )}
                scrollEventThrottle={16}
                bounces={false} 
                scrollEnabled={this.state.scrollEnable}
              >
                <AniFlat
                  style={{transform: [{translateY: rightY}]}}
                  bounces={false}
                  data={flatData}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderDataItem}
                  />
              </Animated.ScrollView>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}


const newStyle = StyleSheet.create({
  tableLeft: {
    width: trheadWidth,
    height: 300
  },
  tableRight: {
    width: rightWidth,
    height: 300,
  },
  titleText: {
    ...thCommonStyle, 
  },
  leftHead: {
    width: trheadWidth,
    height: thHeight,
    zIndex: 100,
    borderRightWidth: tdBorderWidth,
    borderRightColor: tdBorderColor,
  },
  rightHead: {
    width: rightWidth,
    height: thHeight,
    flexDirection: 'row',
    zIndex: 10,
  },
  rightHeadView: {
    width: tdWidth,
    height: thHeight,    
    lineHeight: thHeight,
    borderRightWidth: tdBorderWidth,
    borderRightColor: tdBorderColor,
  },
  rightRow: {
    flex:1,
    flexDirection: 'row',
  },
  leftItemView: {
    width: trheadWidth,
    height: trHeight,
    borderBottomWidth: tdBorderWidth,
    borderBottomColor: tdBorderColor,
    borderRightWidth: tdBorderWidth,
    borderRightColor: tdBorderColor,
  },
  leftItemText: {
    fontSize: 16,
    lineHeight: trHeight,
    fontWeight: 'bold',
    backgroundColor: tdBGC,
  },
  rightItemView: {
    width: tdWidth,
    height: trHeight,
    borderBottomWidth: tdBorderWidth,
    borderBottomColor: tdBorderColor,
    borderRightWidth: tdBorderWidth,
    borderRightColor: tdBorderColor,
  },
  rightItemText: {
    fontSize: 16,
    lineHeight: trHeight,
    backgroundColor: tdBGC,
    textAlign: 'right',
  }
})
export default App1