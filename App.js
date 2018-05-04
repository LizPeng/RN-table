
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
  import Table from './Table'

  import AnExScroll from './AnExScroll'
  const scrollWidth = 950
  const {width} = Dimensions.get('window')

  const AniFlat = Animated.createAnimatedComponent(FlatList)

  const colnameList = ['油品分类', '油品分类', '油库', '油品分类', '油品分类']
  const flatData = [[21.8,17.57,-0.6,"81%"],[10.8,9.43,0.43,"87%"],[5.55,4.12,-0.5,"74%"],[3.7,2.88,-0.2,"78%"],[0.7,0.72,0.13,"103%"],[0.6,0.81,0.31,"135%"],[0.25,0.1,-0.11,"40%"],[0,0,0,"0%"],[11,7.53,-1.64,"69%"],[0,0,0,"0%"],[11,7.53,-1.64,"69%"],[0,0,0,"0%"],[0,0.61,0.61,"0%"]]
  const columnItems = ['计划', '完成', '超欠', '完成率']
  let rowItems =['合计', '汽油', '92#高清', '92#组分', '95#高清', '95#组分', '98#高清', '98#组分', '柴油', '0#普柴', '0#车柴', '-10#车柴', '燃料乙醇']
// const AniFlat
  // 转换成对象组成的数组
  const formatfinal = flatData.map( item => {
    let res = {}
    res.plan = item[0]
    res.finish = item[1]
    res.qian = item[2]
    res.ratio = item[3]
    return res
  })

class RightTitle extends Component {
  render() {
    return (
      <View style={newStyle.rightHead}>
        {columnItems.map( (item, index) => <Text key={index} style={newStyle.rightHeadItem}>{item}</Text> )}
      </View>
    )
  }
}

class LeftTitle extends Component {
  render() {
    return (
      <Text style={newStyle.leftHead}> 'blabla'</Text>
    )
  }
}
class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      xValue:  new Animated.Value(0),
      leftY: new Animated.Value(0),
      rightY: new Animated.Value(0)
    }
  }

  _renderDataItem = ({item, index})=>  (
    <View style={newStyle.rightRow}>
      <Text style={newStyle.rightItemText}>{item.plan}</Text>
      <Text style={newStyle.rightItemText}>{item.finish}</Text>
      <Text style={newStyle.rightItemText}>{item.qian}</Text>
      <Text style={newStyle.rightItemText}>{item.ratio}</Text>
    </View>
  )

  _keyExtractor = (item, index) => index.toString();

  _renderLeftItem = ({item}) => (
    <View style={newStyle.leftItemView}>
      <Text style={newStyle.leftItemText}>{item}</Text>
    </View>
  )
  render() {

    let scrollX = this.state.xValue.interpolate({
      inputRange: [0,scrollWidth],
      outputRange: [0,scrollWidth],
    })
    let leftY = this.state.leftY.interpolate({
      inputRange: [0,1900],
      outputRange: [0,-1900],
    })
    let rightY = this.state.rightY.interpolate({
      inputRange: [0,1900],
      outputRange: [0,-1900],
    })
    return (
      <View style={{flex:1}}>
        <Animated.ScrollView 
          style={{flex:1}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.state.xValue}}}],
            {useNativeDriver: true}
          )}
          scrollEventThrottle={1}
          bounces={false}
          >
          <View style={newStyle.container}>
            <View style={newStyle.tableLeft}>
              <Animated.View style={{flex:1, transform: [{translateX: scrollX}]}}>
                <LeftTitle />
                <Animated.ScrollView
                  showsVerticalScrollIndicator={false}
                  // style={{marginTop: leftY}}                     
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.rightY}}}],
                    // {useNativeDriver: true}
                  )}
                  scrollEventThrottle={1}
                  bounces={false}
                > 
                  <Animated.View style={{marginTop: leftY, flex: 1}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      bounces={false}
                      data={rowItems}
                      // extraData={this.state.rightY}
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderLeftItem}
                    />
                  </Animated.View>
                </Animated.ScrollView>                
              </Animated.View>
            </View>
            <View style={newStyle.tableRight}>
              <RightTitle />
              {/* 右侧list */}
                {/* <Animated.ScrollView
                  // style={{marginTop: rightY}}
                  showsVerticalScrollIndicator={false}              
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.leftY}}}],
                    // {useNativeDriver: true}
                  )}
                  scrollEventThrottle={1}
                  bounces={false}  
                > */}
                <Animated.View style={{marginTop: rightY, flex: 1}}>   
                  <AniFlat
                    showsVerticalScrollIndicator={false}              
                    onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {y: this.state.leftY}}}],
                      // {useNativeDriver: true}
                    )}
                    scrollEventThrottle={1}
                    bounces={false}  
                    data={formatfinal}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderDataItem}
                    />
                </Animated.View>
                {/* </Animated.ScrollView> */}
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

// 定义基础尺寸
const 
  trheadWidth = 100, // 表格行第一列宽
  minTDWidth = (width - trheadWidth) / columnItems.length ,//定义td最小宽度，占满整个屏幕宽度
  trHeight = 60,     // 表格行高
  tdWidth = minTDWidth > 100 ? minTDWidth : 100,     // 表格行宽
  thHeight = trheadWidth, // 表格头部 高度
  // 定义内部容器尺寸
  containerHeight = rowItems.length * trHeight + thHeight,
  containerWidth = trheadWidth + tdWidth * columnItems.length 

const newStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: containerWidth,
  },
  tableLeft: {
    width: trheadWidth,
    zIndex: 100,
  },
  tableRight: {
    width: tdWidth * columnItems.length ,
  },
  leftItemView: {
    // flex:1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  leftItemText: {
    flex:1,
    fontSize: 16,
    height: trHeight,
    fontWeight: 'bold',
    backgroundColor: '#fff'
  },
  rightRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rightItemText: {
    flex:1,
    fontSize: 16,
    height: trHeight,
    backgroundColor: '#fff',
    textAlign: 'right'
  },
  leftHead: {
    width: trheadWidth,
    height: thHeight,
    backgroundColor: 'grey',
    zIndex: 100
  },
  rightHead: {
    width: tdWidth * columnItems.length,
    height: thHeight,
    flexDirection: 'row',
    backgroundColor: 'grey',
    zIndex: 100,
  },
  rightHeadItem: {
    flex:1,
    fontSize: 16,
    color:'#fff',
    height: thHeight,
    textAlign: 'right',
    zIndex: 10,
  },
  
})
const App2 = () => {
  return (
    <View>
      <View style={{height: 100}}>
        <Text style={{height: 50,backgroundColor: 'red'}}>'lorem'</Text>
        <Text style={{height: 50,backgroundColor: 'red'}}>'lorem'</Text> 
      </View>
      <View style={{width:width, height: 500, marginTop: 10,borderBottomWidth:1, borderBottomColor:'#ab4'}}>
        <Table/>
      </View>
    </View>
  )
}
export default App2