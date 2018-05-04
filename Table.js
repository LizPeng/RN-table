
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


// 定义样式
// 定义基础尺寸
const 
  trheadWidth = 110, // 表格行第一列宽
  thHeight = 40,     // 表格头部 高度
  trHeight = 36,     // 表格行高
  // 数据单元格宽度，小于三列的不滑动
  // minTDWidth = (width - trheadWidth) / 4 ,//定义td最小宽度，占满整个屏幕宽度!!!!!!
  // tdWidth = minTDWidth > 100 ? minTDWidth : 100,     // 表格行宽
  rightWidth =  width// !!!!!!
const thCommonStyle={
  lineHeight: thHeight,
  fontWeight: 'bold',
  color: '#7d7d7d',
  backgroundColor: '#ebebeb',
  textAlign: 'center',
}
const tdBorderWidth = 1
const tdBorderColor = '#ddd'
const tdTextColor = '#333'
const tdBGC = '#fff'
const textClassStyle = {
  allClass : {
    color: '#0e6923',
    backgroundColor: '#f7fff0',
  },
  classA : {
    color: '#9f824b',
    backgroundColor: '#fcf2de',
  }
}

// 右侧数据的渲染
const RightRow = (props) => {
  const {item, type = 'rightItemText'} = props
  // 根据type判断style!!!!!!
  const finalStyle = StyleSheet.flatten([
    newStyle.rightItemText, textClassStyle[type]
  ])
  return (
    <View style={newStyle.rightRow}>
      <View style={newStyle.rightItemView}><Text style={finalStyle}>{item[0]}</Text></View>
      <View style={newStyle.rightItemView}><Text style={finalStyle}>{item[1]}</Text></View>
      {item[2]!== undefined && <View style={newStyle.rightItemView}><Text style={finalStyle}>{item[2]}</Text></View>}
      {item[3]!== undefined && <View style={newStyle.rightItemView}><Text style={finalStyle}>{item[3]}</Text></View>}
      {item[4]!== undefined && <View style={newStyle.rightItemView}><Text style={finalStyle}>{item[4]}</Text></View>}
    </View>
  )
}
const LeftRow = (props) => {
  const {item, type = 'rightItemText'} = props
  const finalStyle = StyleSheet.flatten([
    newStyle.leftItemText, textClassStyle[type]
  ])
  return (
    <View style={newStyle.leftItemView}>
      <Text style={finalStyle}>{item}</Text>
    </View>
  )
}

class Table extends Component {

  rowLength = this.props.columnNames.length

  constructor(props) {
    super(props);
    this.state = {
      xValue:  new Animated.Value(0),
      leftY: new Animated.Value(0),
      rightY: new Animated.Value(0),
    }
  }
  _renderDataItem = ({item, index})=>  {
    // 根据index判断类型->样式 !!!!!!!
    // 合计、湖北小计-> 绿色 allClass
    // 汽油、柴油、自有库、租赁库 -> 棕色 classA
    if(index === 0 ){
      return  <RightRow item={item} type={'allClass'}/>
    } else if (this.props.rowClassIndex.includes(index)){
      return  <RightRow item={item} type={'classA'}/>
    }else {
      return  <RightRow item={item} />
    }
  }
  _keyExtractor = (item, index) => index.toString();

  _renderLeftItem = ({item, index}) => {
    // 参考_renderDataItem
    if(index === 0 ){
      return  <LeftRow item={item} type={'allClass'}/>
    } else if (this.props.rowClassIndex.includes(index)){
      return  <LeftRow item={item} type={'classA'}/>
    }else {
      return  <LeftRow item={item} />
    }
  }
  // 定义子组件
  LeftTitle = () => (
    <View style={newStyle.leftHead}><Text style={{...thCommonStyle}}> {this.props.leftTitleName}</Text></View>
  )
  RightTitle = () => (
    <View style={newStyle.rightHead}>
      {this.props.columnNames.map( (item, index) => <View style={newStyle.rightHeadView} key={index}><Text style={{...thCommonStyle}}>{item}</Text></View> )}
    </View>
  )
  render() {

    // 定义动画效果
    let scrollX = this.state.xValue.interpolate({
      inputRange: [0,scrollWidth],
      outputRange: [0,scrollWidth],
    })
    let leftY = this.state.leftY.interpolate({
      inputRange: [0,1000],
      outputRange: [0,-1000],
      extrapolate: 'clamp'
    })
    let rightY = this.state.rightY.interpolate({
      inputRange: [0,1000],
      outputRange: [0,-1000],
      extrapolate: 'clamp'
    })
   
    return (
      <View style={{ flexDirection: 'row'}}>
        <View style={newStyle.tableLeft}>
          {this.LeftTitle()}
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
                data={this.props.rowNames}
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
            {this.RightTitle()}
            {/* 右侧list */}
              <Animated.ScrollView
                contentContainerStyle={{minHeight: 400}}
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
                  // style={{transform: [{translateY: rightY}]}}
                  bounces={false}
                  data={this.props.data}
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
  },
  tableRight: {
    width: rightWidth,
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
    borderTopWidth: tdBorderWidth,
    borderTopColor: tdBorderColor,
  },
  rightHead: {
    width: rightWidth,
    height: thHeight,
    flexDirection: 'row',
    zIndex: 10,
  },
  rightHeadView: {
    flex:1, //width: tdWidth,
    height: thHeight,    
    borderRightWidth: tdBorderWidth,
    borderRightColor: tdBorderColor,
    borderTopWidth: tdBorderWidth,
    borderTopColor: tdBorderColor,
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
    paddingLeft: 10,    
    lineHeight: trHeight,
    fontWeight: 'bold',
    backgroundColor: tdBGC,
  },
  rightItemView: {
    flex:1, // width: tdWidth,
    height: trHeight,
    borderBottomWidth: tdBorderWidth,
    borderBottomColor: tdBorderColor,
    borderRightWidth: tdBorderWidth,
    borderRightColor: tdBorderColor,
  },
  rightItemText: {
    fontSize: 14,
    paddingRight: 10,
    lineHeight: trHeight,
    backgroundColor: tdBGC,
    textAlign: 'right',
  },
})

export default Table