/**
 Created by suchengdong on 2017/09/01.
 */
import React, {Component} from 'react';
import {WebView, View, StyleSheet, Platform, TouchableWithoutFeedback} from 'react-native';
import renderChart from './renderChart';

export default class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.option) !== JSON.stringify(this.props.option)) {
            this.refs.chart.reload();
        }
    }

    onMessage = event => {
        this.props.onPressone && this.props.onPressone(event.nativeEvent.data);
    };

    renderContents = () => {
        const tplPath = Platform.OS == 'ios' ? require('./tpl.html') : {uri: 'file:///android_asset/tpl.html'},
        sourceHtml = `
        <!DOCTYPE html>
        <head>
          <title>echarts</title>
          <meta http-equiv="content-type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
          <style type="text/css">
            html,body {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
            }
            #main {
                width: 100%;
                height: 100%;
            }
          </style>
          <script src="https://cdn.bootcss.com/echarts/3.3.2/echarts.min.js"></script>
        </head>
        <body>
          <div id="main" >发地方大幅度发</div>
          <script>
            
          </script>
        </body>
      </html>
        `
        return (<View style={{flex: 1, height: this.props.height || 400, borderWidth: 1, borderColor: '#00000000'}}>
            <WebView
                ref="chart"
                scrollEnabled={false}
                onMessage={this.onMessage}
                injectedJavaScript={renderChart(this.props)}
                style={{
                    height: this.props.height || 400,
                }}
                scalesPageToFit={Platform.select({ios: false, android: true})}
                source={{
                    // uri: 'http://119.97.219.136:8088/ui-designer/app/tpl.html'
                    html: sourceHtml
                }}
            />
        </View>);
    };

    render() {
        if (this.props.onPress && typeof this.props.onPress === 'function') {
            return (
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    {this.renderContents()}
                </TouchableWithoutFeedback>
            );
        } else {
            return this.renderContents();
        }
    }
}
