// 配置请参考https://github.com/ant-design/ant-design-mobile/issues/654
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, FlatList, SectionList, TouchableWithoutFeedback} from 'react-native';
import { DatePicker, List, SegmentedControl, Button, Tag, Drawer, Picker, Checkbox} from 'antd-mobile';
import orgInfo from './data/org'

const CheckboxItem = Checkbox.CheckboxItem,
  checkboxHeight = 40,
  headItemHeight = 40
const { width, height} = Dimensions.get('window')
const zhibiaoData = [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
];

const wdData = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];
const day = new Date()
const yesterday = day.getTime()-24*60*60*1000
const initialState = {
  open: false,
  date: new Date(yesterday),
  dateType: 2,
  zb: 0,
  wd:0,
  mom:false,
  yoy:false,
  checkedData:{}
};
export default class App extends React.Component {
  
  
  constructor(props) {
    super(props)
    this.state = initialState
  }
  onDateChange = (date) => {
      console.log('DatePicker: ', date)
      this.setState({ date })
  };
  onSegmentChange = (e) => {
    console.log('SegmentedControl: ', e.nativeEvent.value, e.nativeEvent.selectedSegmentIndex)
    this.setState({
      dateType: e.nativeEvent.selectedSegmentIndex
    })
  };
  onMChange(selected) {
    console.log(`M同比 tag selected:${selected}`);
    this.setState({
      mom: selected
    })
  }
  onYChange(selected) {
    console.log(`Y环比 tag selected:${selected}`);
    this.setState({
      yoy: selected
    })
  }
  onWDChange(v) {
    console.log('维度改变： ', v)
    this.setState({ wd: v})
  }

  onDock = (d) => {
    this.setState({
      [d]: !this.state[d]
    })
  }

  render() {
    const segment = (
      <SegmentedControl
        style={{width: '50%'}}
            values={['年', '月', '日']}
            selectedIndex={this.state.dateType}
            onChange={this.onSegmentChange}
          />
    )
    const tags = (
       <View >
         <View style={{flexDirection: 'row'}}>
           <Tag selected={this.state.mom} onChange={ e => this.onMChange(e)}>同比</Tag>
           <Tag selected={this.state.yoy} style={{marginLeft:5}} onChange={e => this.onYChange(e)}>环比</Tag>
         </View>
       </View>
    )
    const checkedData = {}
    const checkboxOnChange= (e, index) => {
      const temp = Object.assign({}, this.state.checkedData, {
        [index]: e.target.checked
      })
      this.setState({ 
        checkedData: temp
       })
    }
    console.log('state:',this.state.checkedData)
    const renderSideItem = ({item, index}) => (
      <CheckboxItem 
        key={index}
        checked={this.state.checkedData[index] === true }
        onChange={ e => checkboxOnChange(e, index)}
      >
      <Text>{item.orgNm}</Text>
      </CheckboxItem>
    )
    const 
      // 所有加油站
      allGasStation = orgInfo.children.map( d => {
        const result = {}
        result.sectionName = d.orgNm
        result.key = d.orgNo
        result.data=[]
        d.children.map(child => {
          result.data.push({
            orgNm: child.orgNm,
            key: child.orgNo
          })
        })
        return result
      }),
      // 所有分公司
      allSubsidiary = orgInfo.children.map( d => {
          const temp = Object.assign({}, d)
          delete temp.children
          return temp
      })
    // 计算滚动高度
    const positionData = {}
    orgInfo.children.map( d => {
      positionData[d.orgNo] = headItemHeight + checkboxHeight * d.children.length 
    })
    
    const renderListItem = ({item}) => {
      const {orgNm, key} = item
      return (
        <View style={{height: checkboxHeight}}>
          <CheckboxItem 
            key={key}
            checked={this.state.checkedData[key] === true }
            onChange={ e => checkboxOnChange(e, key)}
          >
          <Text>{orgNm}</Text>
          </CheckboxItem>
        </View>
      )
    }
    const renderHeadItem = ({section}) => {
      const {sectionName, key} = section
      console.log(sectionName,key)
      return (
          <View 
            style={{width: '100%',height: headItemHeight, backgroundColor: 'rgb(16, 131,230)'}}
          >
            <Text style={{fontSize: 20, textAlign: 'center',lineHeight: 36, color:'#fff'}}>{sectionName}</Text>
          </View>
      )
    }
    // 分组头部显示
    // scrollPositon = (item) => {
    //   const list = Object.keys(positionData)
    //   let result = 0
    //   list.map(d => {
    //     if(d<item){
    //       result += positionData[d]
    //     }
    //   })
    //   return result
    // }
    const abbrOnpress= (index) => {
      // console.log(this._list, scrollPositon(orgNo))
      // const pos = scrollPositon(orgNo)
      this._list.scrollToLocation({
        animated: false,
        sectionIndex: index,
        itemIndex: 0,
        viewPosition:0.5
      })
  }
    const renderABBR= ({item, index}) => {
      
      return (
        <TouchableWithoutFeedback onPress={() => abbrOnpress(index)}>
          <View style={styles.abbrTitle}>
            <Text style={{color: '#bbb'}}>{item.orgNm.slice(0,2)}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    const sidebar = (
      <View style={{height: height, position:'relative'}}>
          <FlatList
            style={{width: 30, backgroundColor: '#fff',paddingBottom: 40, paddingTop: 40,position:'absolute', right: 0,top: 0,zIndex: 10}}
            bounces={false}
            keyExtractor={(d,i) => i.toString()}
            data={allSubsidiary}
            renderItem={renderABBR}
            />
            <SectionList
              ref={(ref) => this._list = ref}
              style={{paddingRight: 30}}
              bounces={false}
              renderItem={({item, index}) => renderListItem({item, index})}
              renderSectionHeader={({section}) => renderHeadItem({section})}
              sections={allGasStation}
              getItemLayout={(data, index) => ({
                index,
                offset: checkboxHeight * index ,
                length: checkboxHeight
                })
              }
            />
      </View>
    );

    const onOpenChange= (e) => {
      if( e!== this.state.open){
        this.setState({ open: e})
      }
    }
    return (
    <View style={{marginTop: 20, flex: 1}}>
      <View style={{height: height}}>
        <Drawer
            drawerWidth={width - 100}
            sidebar={sidebar}
            position={'right'}
            open={this.state.open}
            onOpenChange={onOpenChange}
        >
          <List.Item 
          arrow="horizontal"
          extra='请选择'
          onClick={() => this.onDock('open')}
        >
          组织机构
        </List.Item>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="选择日期"
          maxDate={new Date(yesterday)}
          value={this.state.date}
          onChange={(date) => this.onDateChange(date)}
        >
          <List.Item arrow="horizontal">日期</List.Item>
        </DatePicker>
        <List.Item 
          extra={segment}
        >
          日期类型
        </List.Item>
        <Picker
          data={zhibiaoData}
          cols={1}
          title="指标"
          extra="选择指标"
          value={this.state.zb}
          onChange={ v => this.setState({ zb: v})}
        >
          <List.Item arrow="horizontal">指标</List.Item>
        </Picker>
        <Picker
          data={wdData}
          cols={2}
          title="维度"
          extra="选择维度"
          cascade={false}
          value={this.state.wd}
          onChange={ v => this.onWDChange(v)}
          
        >
          <List.Item arrow="horizontal">维度</List.Item>
        </Picker>
        <List.Item 
          extra={tags}
        >对比</List.Item>
        <View style={{flexDirection: 'row', alignSelf:'center'}}>
          <Button
            onClick={() => this.setState({...initialState})}
            style={{margin: 5,width:100,height: 30}} 
            type='warning'>
            重置
          </Button>
          <Button
            style={{margin: 5,width:100,height: 30}} 
            type='primary'>
            保存
          </Button>
        </View>
        </Drawer>
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  abbrTitle: {
    
    paddingTop:10,
    paddingBottom:10,
    margin: 0
  }
})