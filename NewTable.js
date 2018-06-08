// 配置请参考https://github.com/ant-design/ant-design-mobile/issues/654
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, FlatList, SectionList, TouchableWithoutFeedback, TextInput, Keyboard} from 'react-native';
import { DatePicker, List, SegmentedControl, Button, Tag, Drawer, Picker, Checkbox, SearchBar} from 'antd-mobile';
import orgInfo from './data/org'

const CheckboxItem = Checkbox.CheckboxItem,
  checkboxHeight = 40,
  headItemHeight = 40

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
      const temp = Object.assign({}, d,{key: d.orgNo})
      delete temp.children
      return temp
  }),
  searchData = {}
  allGasStation.map( d=> {
    searchData[d.key] = d.data
  })

// 计算滚动高度
const positionData = {}
orgInfo.children.map( d => {
  positionData[d.orgNo] = headItemHeight + checkboxHeight * d.children.length 
})
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
  checkedData:{},
  showSubsidiary: true,
  selectAllSubsidiary: false,
  searchInput: '',
  searhResult: [...allGasStation],
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
  _onSearchChange =(e) => {
    this.setState({
      searchInput: e
    })
  }
  _selectAllSub =() => {
    const temp = {...this.state.checkedData},
      current = this.state.selectAllSubsidiary
      console.log(current)
    allSubsidiary.map(d => {
      Object.assign(temp, {
        [d.orgNo]: !current
      })
    })
    console.log(temp)
    this.setState({ 
      checkedData: temp,
      selectAllSubsidiary: !current
     })
  }
  _searchResult = (input) => {
    const temp = [...allGasStation]
    const result = []
    temp.map( d => {
      const data = []
      d.data.map( dd => {
         if(dd.orgNm.includes(input)) {
           data.push(dd)
         }
      })
      const final = {
        sectionName: d.sectionName,
        key: d.key,
        data: data
      }
      return data.length !== 0 ? result.push(final) : null
    })
    console.log('searchResult: ' ,result)
    // this.setState({
    //   searhResult: result
    // })
  }
  render() {
    console.log(this.state.searchInput)
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
    const renderSideItem = ({item, index}) => (
      <CheckboxItem 
        key={index}
        checked={this.state.checkedData[index] === true }
        onChange={ e => checkboxOnChange(e, index)}
      >
      <Text>{item.orgNm}</Text>
      </CheckboxItem>
    )
   
    
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
      // console.log(sectionName,key)
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
    console.log('allGasStation:  ', allSubsidiary, allGasStation ,searchData)
    const gasList = () => (
      <View style={{paddingRight:30}}>
        <FlatList
            style={{width: 30, backgroundColor: '#fff',paddingBottom: 20, paddingTop: 20,position:'absolute', right: 0,top: 0,zIndex: 10}}
            bounces={false}
            keyExtractor={(d,i) => i.toString()}
            data={allSubsidiary}
            renderItem={renderABBR}
          />
          <SectionList
            ref={(ref) => this._list = ref}
            style={{paddingRight: 0}}
            stickySectionHeadersEnabled={true}
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
    )
    const subList = () => (
        <FlatList
            style={{flex: 1}}
            bounces={false}
            keyExtractor={(d,i) => i.toString()}
            data={allSubsidiary}
            renderItem={renderListItem}
        />
     )
    const searchView = () => (
      <View style={{flexDirection: 'row', height: 30, }}>
          <TextInput
              style={{flex:1, backgroundColor:'#bbb',padding:5,marginRight: 10,}}
              placeholder="请输入搜索内容"
              onBlur={() => Keyboard.dismiss()}
              onChangeText={(text) => this._onSearchChange(text)}
          />
          <Button
            inline
            type='primary'
            style={{width: 90,height: 30,}}
            onClick={this._searchResult(this.state.searchInput)}
          >
          搜索
          </Button>
      </View>
    )
    const sidebar = (
      // -20 减去上边距!!!!
      <View style={{height: height - 20}}>
        <View style={{backgroundColor: '#fff'}}>
          {
            this.state.showSubsidiary 
            ? null
            : searchView()
          }
          <View style={{flexDirection: 'row', justifyContent: 'space-between', height:40, backgroundColor: '#fff'}}>
            <Button inline type='primary' style={{marginLeft: 10, marginTop: 10, width: 140,height:28}}
              onClick={() => this._selectAllSub()}
            >
              { this.state.selectAllSubsidiary ? '分公司全不选': '分公司全选'}
            </Button>
            <Button inline type='primary' style={{marginLeft: 10, marginTop: 10, width: 90,height:28}} 
              onClick={() => this.setState({showSubsidiary: !this.state.showSubsidiary})}>
              {this.state.showSubsidiary ? '加油站' : '分公司'}
            </Button>
          </View>
        </View>
        <View style={{flex: 1}}>
          {
            this.state.showSubsidiary 
            ? subList()
            : gasList()
          }
        </View>
        
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