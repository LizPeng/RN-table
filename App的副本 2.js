
import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  SectionList,
  ScrollView,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  NativeModules
} from 'react-native';
import AnimatedScrollViewHeader from './animated'
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
const {width, height} = Dimensions.get('window')
const sectionWidth = 550,
  leftHeadWidth = 100
  const sections = [
    { key: "A", data: [{ title: "表哥" }, { title: "贝贝" }, { title: "表弟" }, { title: "表姐" }, { title: "表叔" },{ title: "阿童木" }, { title: "阿玛尼" }, { title: "爱多多" },{ title: "王磊" }, { title: "王者荣耀" }, { title: "往事不能回味" },{ title: "王小磊" }, { title: "王中磊" }, { title: "王大磊" }] },
    { key: "B", data: [] },
  ];
class FixedCol extends Component {
  _renderHorizItem = (item) => {
    let txt = '  ' + item.item.title;
    return (
      <View style={[styles.itemView, {width: leftHeadWidth}]}>
        <Text style={styles.item}>'{txt}'</Text>
      </View>
    )
  }
  render() {
    return (
      <SectionList
            // ref={ref => this.seclist = ref}
            style={{width: leftHeadWidth}}
            renderSectionHeader={()=> <Text
              style={[styles.sectionHead, {width: leftHeadWidth}]}>部分</Text>}
            renderItem={this._renderHorizItem}
            sections={sections}
            keyExtractor={(item,key) => key}
            contentOffset={{x: 0,y: this.props.sethead}}
            scrollEnabled={false}
            scrollEventThrottle={1}
          />
    )
  }
}

 class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sethead: 0
    }
  }

  _renderItem = (info) => {
    let txt = '  ' + info.item.title;
  
    return (
    <View style={styles.colStyle}>
      <View style={styles.itemView}>
        <Text style={styles.item}>{txt}</Text>
      </View>
      <View style={styles.itemView}>
        <Text style={styles.item}>'hello'</Text>
      </View>
      <View style={styles.itemView}>
        <Text style={styles.item}>'hello1'</Text>
      </View>
      <View style={styles.itemView}>
        <Text style={styles.item}>'hello2'</Text>
      </View>
    </View>
    
    )
  }
  _renderHorizItem = (item) => {
    let txt = '  ' + item.item.title;
    return (
      <View style={[styles.itemView, {width: leftHeadWidth}]}>
        <Text style={styles.item}>'{txt}'</Text>
      </View>
    )
  }
  _sectionhorizeComp = (info) => {
    var txt = info.section.key;
    return <Text
      style={[styles.sectionHead, {width: leftHeadWidth}]}>{txt}部分</Text>
  }
  _sectionComp = (info) => {
    var txt = info.section.key;
    return <Text
      style={[styles.sectionHead, {width: sectionWidth}]}>{txt}部分</Text>
  }

  render() {
    
    const testData = [[124802,1166],[79580,577],[35728,120],[26332,296],[8455,31],[7256,131],[1808,0],[0,0],[45222,589],[0,0],[45222,589],[0,0],[0,0]]
    
    return (

      <View style={{ flex:1,marginTop:20,flexDirection: 'row'}}>
        <View style={{width: leftHeadWidth}}>
          <FixedCol sethead={this.state.sethead}/>
        </View>
        <View style={{flex:1}}>
        <ScrollView
          ref={ref => this.seclist = ref}
          style={{flex:1}}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          alwaysBounceHorizontal={true}
          onScroll={(e) => {
            console.log('scrollview X:', e.nativeEvent.contentOffset.x)
          }}
          scrollEventThrottle={16}
        >
          <SectionList
            renderSectionHeader={this._sectionComp}
            renderItem={this._renderItem}
            sections={sections}
            keyExtractor={(item,key) => key}
            contentOffset={{x: 0,y: this.state.setbody}}
            onScroll={(e) => {
              console.log('sectionlist: Y', e.nativeEvent.contentOffset.y)
              
            }}
            scrollEventThrottle={1}
          />
        </ScrollView>
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({

  sectionHead: { 
    height: 50, 
    textAlign: 'center', 
    textAlignVertical: 'center', 
    backgroundColor: '#9CEBBC', 
    color: 'white', 
    fontSize: 30
  },
  item: { 
    height: 60, 
    flex:1,
    textAlignVertical: 'center', 
    backgroundColor: "#ffffff", 
    color: '#5C5C5C', 
    fontSize: 15 
  },

  itemView: {
    flex:1,
    borderLeftWidth: 2,
    borderLeftColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  colStyle: {
    flexDirection: 'row',
    width:sectionWidth,
  }
})

export default HomeScreen